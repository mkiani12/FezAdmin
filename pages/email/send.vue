<script setup lang="ts">
useHead({ title: "Send Emails" });

// Single email state
const singleEmail = ref(null);
const singleSubject = ref("");
const singleContent = ref("");
const isSendingSingle = ref(false); // Tracks loading state during API call

// Multiple emails state
const manyEmails = ref<string[]>([]);
const manySubject = ref("");
const manyContent = ref("");
const isSendingMany = ref(false); // Tracks loading state during API call

// Type for email options (display and raw value)
interface EmailOption {
  text: string; // Display text (name + email)
  value: string; // Actual email address value
}

// List of email options for the combobox
const emailOptions = ref<EmailOption[]>([]);

// API setup
const axios = useApi();

// Fetch registered emails
const fetchRegisteredEmails = async () => {
  try {
    // Request the email list from the backend
    const { data } = await axios.get("/admin/email/list");

    // Transform the received data into an array of objects used by our combobox
    emailOptions.value = data.map((item: any) => ({
      text: `${item.name} (${item.email})`,
      value: item.email,
    }));
  } catch (error) {
    console.error("Error fetching registered emails:", error);
  }
};

// "Select All"/"Deselect All" toggle text
const toggleText = computed(() => {
  const allEmails = emailOptions.value.map((item: EmailOption) => item.value);
  return manyEmails.value.length === allEmails.length
    ? "Deselect All"
    : "Select All";
});

// Toggle selection of all emails (assign array of strings)
const toggleSelectAllEmails = () => {
  const allEmails = emailOptions.value.map((item: EmailOption) => item.value);
  if (manyEmails.value.length === allEmails.length) {
    manyEmails.value = []; // Clear selection if all are currently selected
  } else {
    // Now assign only an array of strings, not the full object.
    manyEmails.value = allEmails;
  }
};

// Extract email from selected value
const extractEmail = (selected: any): string => {
  return typeof selected === "object" && selected !== null && selected.value
    ? selected.value
    : selected;
};

// Send single email
const sendSingleEmail = async () => {
  if (!singleEmail.value || !singleSubject.value || !singleContent.value) {
    console.error("Fill email, subject, and content.");
    return;
  }
  isSendingSingle.value = true; // Show loading indicator
  try {
    // Send the email using our API endpoint
    await axios.post("/admin/email/send", {
      subject: singleSubject.value,
      content: singleContent.value,
      emails: [extractEmail(singleEmail.value)], // Extract email string from selection
    });
    // Reset fields after a successful send
    singleSubject.value = "";
    singleContent.value = "";
  } catch (error) {
    console.error("Error sending email:", error);
  } finally {
    isSendingSingle.value = false; // Hide loading indicator
  }
};

// Send email to multiple recipients
const sendManyEmail = async () => {
  if (
    manyEmails.value.length === 0 ||
    !manySubject.value ||
    !manyContent.value
  ) {
    console.error("Select at least one email and fill in subject/content.");
    return;
  }
  isSendingMany.value = true; // Show loading indicator
  try {
    // Send the email to multiple recipients using the same endpoint
    await axios.post("/admin/email/send", {
      subject: manySubject.value,
      content: manyContent.value,
      emails: manyEmails.value.map(extractEmail), // Map selections to email strings
    });
    // Clear the fields after successful sending
    manySubject.value = "";
    manyContent.value = "";
  } catch (error) {
    console.error("Failed to send emails to multiple recipients:", error);
  } finally {
    isSendingMany.value = false; // Hide loading indicator
  }
};

// When the component mounts, load the registered email list
onMounted(() => {
  fetchRegisteredEmails();
});
</script>

<template>
  <SharedUiParentCard title="Send Email">
    <v-container class="px-6">
      <v-row>
        <!-- Section for Sending a Single Email -->
        <v-col md="6" cols="12">
          <v-card>
            <v-card-title class="px-6 py-3">Send to One</v-card-title>
            <v-card-text>
              <v-form>
                <!-- Text input for the email subject -->
                <v-text-field
                  class="mb-3"
                  label="Subject"
                  v-model="singleSubject"
                  placeholder="Enter email subject"
                />
                <!-- Combobox to enter/select the recipient email address -->
                <v-combobox
                  class="mb-3"
                  label="Email"
                  v-model="singleEmail"
                  :items="emailOptions"
                  item-title="text"
                  item-value="value"
                  placeholder="Enter or select recipient email"
                />
                <!-- Textarea for writing the email content -->
                <v-textarea
                  class="mb-3"
                  label="Content"
                  v-model="singleContent"
                  placeholder="Enter email content"
                />
                <!-- Button to send the email -->
                <v-btn
                  color="primary"
                  :loading="isSendingSingle"
                  @click="sendSingleEmail"
                >
                  Send Email
                </v-btn>
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>

        <!-- Section for Sending Email to Multiple Recipients -->
        <v-col md="6" cols="12">
          <v-card>
            <v-card-title class="px-6 py-3">Send to Many</v-card-title>
            <v-card-text>
              <v-form>
                <!-- Input field for the email subject -->
                <v-text-field
                  class="mb-3"
                  label="Subject"
                  v-model="manySubject"
                  placeholder="Enter email subject"
                />
                <!-- Combobox for multiple recipient selection with a toggle option in the dropdown -->
                <v-combobox
                  class="mb-3"
                  label="Emails"
                  v-model="manyEmails"
                  :items="emailOptions"
                  multiple
                  chips
                  item-title="text"
                  item-value="value"
                  placeholder="Select or enter recipients"
                >
                  <!-- Prepend an option in the dropdown to toggle the selection of all emails -->
                  <template v-slot:prepend-item>
                    <v-list-item
                      ripple
                      @click="toggleSelectAllEmails"
                      style="cursor: pointer"
                    >
                      <v-list-item-content>
                        <v-list-item-title>{{ toggleText }}</v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                    <v-divider />
                  </template>
                </v-combobox>
                <!-- Textarea for the email content -->
                <v-textarea
                  class="mb-3"
                  label="Content"
                  v-model="manyContent"
                  placeholder="Enter email content"
                />
                <!-- Button to send the email to all selected recipients -->
                <v-btn
                  color="primary"
                  :loading="isSendingMany"
                  @click="sendManyEmail"
                >
                  Send Email
                </v-btn>
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </SharedUiParentCard>
</template>
