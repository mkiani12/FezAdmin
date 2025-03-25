<script setup lang="ts">
// --- Single Send State ---
const singleEmail = ref("");
const singleContent = ref("");
const isSendingSingle = ref(false);

// --- Multiple Send State ---
const manyEmails = ref<string[]>([]);
const manyContent = ref("");
const isSendingMany = ref(false);
const emailOptions = ref<string[]>([]); // List of registered emails

// API instance (assuming your useApi composable wraps axios)
const axios = useApi();

// Fetch registered emails for both modes
const fetchRegisteredEmails = async () => {
  try {
    const { data } = await axios.get("/api/registered-emails"); // Replace with your actual endpoint
    // Assuming data returns an array of email strings
    emailOptions.value = data;
  } catch (error) {
    console.error("Error fetching registered emails:", error);
  }
};

// Function to send an email to a single recipient
const sendSingleEmail = async () => {
  if (!singleEmail.value || !singleContent.value) {
    console.error("Email and content are required for sending.");
    return;
  }
  isSendingSingle.value = true;
  try {
    await axios.post("/api/send-email", {
      email: singleEmail.value,
      content: singleContent.value,
    });
    // Optionally, display a success notification here
  } catch (error) {
    console.error("Error sending email:", error);
  } finally {
    isSendingSingle.value = false;
  }
};

// Function to send an email to multiple recipients
const sendManyEmail = async () => {
  if (manyEmails.value.length === 0 || !manyContent.value) {
    console.error("Please select at least one email and enter content.");
    return;
  }
  isSendingMany.value = true;
  try {
    await axios.post("/api/send-email-multiple", {
      emails: manyEmails.value,
      content: manyContent.value,
    });
    // Optionally, display a success notification here
  } catch (error) {
    console.error("Error sending emails:", error);
  } finally {
    isSendingMany.value = false;
  }
};

// Fetch the registered emails when the component mounts
onMounted(() => {
  fetchRegisteredEmails();
});
</script>

<template>
  <SharedUiParentCard title="Send Email">
    <v-container class="px-6">
      <v-row>
        <!-- Send to One Mode -->
        <v-col md="6" cols="12">
          <v-card>
            <v-card-title class="px-6 py-3">Send to One</v-card-title>
            <v-card-text>
              <v-form>
                <!-- Using v-combobox for autocomplete & free entry -->
                <v-combobox
                  class="mb-3"
                  label="Email"
                  v-model="singleEmail"
                  :items="emailOptions"
                  placeholder="Enter or select recipient email"
                />
                <v-textarea
                  class="mb-3"
                  label="Content"
                  v-model="singleContent"
                  placeholder="Enter email content"
                />
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

        <!-- Send to Many Mode -->
        <v-col md="6" cols="12">
          <v-card>
            <v-card-title class="px-6 py-3">Send to Many</v-card-title>
            <v-card-text>
              <v-form>
                <!-- Using v-combobox for multi-selection with search & free entry -->
                <v-combobox
                  class="mb-3"
                  label="Emails"
                  v-model="manyEmails"
                  :items="emailOptions"
                  multiple
                  chips
                  placeholder="Select or enter recipients"
                />
                <v-textarea
                  class="mb-3"
                  label="Content"
                  v-model="manyContent"
                  placeholder="Enter email content"
                />
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

<style scoped>
/* Add custom styles if needed */
</style>
