<script setup lang="ts">
useHead({
  title: "Add a Demo",
});

// State for form fields and loading
const email = ref("");
const companyName = ref("");
const message = ref("");
const isSending = ref(false);
const sendValidated = ref(false);

// API instance from useApi
const axios = useApi();
const notifier = useSnackbarStore();
const { validationRules: rules } = useValidation();

// Send demo email
const sendDemoEmail = async () => {
  if (!email.value) {
    console.error("Email is required.");
    return;
  }
  isSending.value = true;
  try {
    await axios.post("/admin/email/demo", {
      email: email.value,
      company_name: companyName.value,
      message: message.value,
    });
    // Show success message
    console.log("Demo email sent!");
    // Reset the form
    email.value = "";
    companyName.value = "";
    message.value = "";

    notifier.showMessage("Demo email sent!", "success");
  } catch (error) {
    console.error("Error sending email:", error);
    notifier.handleCatch(error);
  } finally {
    isSending.value = false;
  }
};
</script>

<template>
  <SharedUiParentCard title="Send Demo Email">
    <v-container class="px-6">
      <v-card>
        <v-card-text>
          <v-form v-model="sendValidated">
            <!-- Email Field -->
            <v-text-field
              label="Email"
              v-model="email"
              placeholder="Enter recipient email"
              required
              :rules="[rules.required, rules.email]"
              class="mb-3"
            />

            <!-- Company Name Field -->
            <v-text-field
              label="Company Name"
              v-model="companyName"
              placeholder="Enter company name (Optional)"
              class="mb-3"
            />

            <!-- Message Field -->
            <v-textarea
              label="Message"
              v-model="message"
              placeholder="Enter your message"
              required
              :rules="[rules.required]"
              class="mb-3"
            />

            <!-- Send Button with Loading Indicator -->
            <v-btn
              color="primary"
              :loading="isSending"
              :disabled="!sendValidated"
              @click="sendDemoEmail"
            >
              Send Demo Email
            </v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-container>
  </SharedUiParentCard>
</template>

<style scoped>
/* Add custom styles if needed */
</style>
