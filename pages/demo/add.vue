<script setup lang="ts">
import { ref } from "vue";

// Reactive state for the form fields and loading state
const email = ref("");
const content = ref("");
const isSending = ref(false);

// API instance (assuming your useApi composable wraps axios)
const axios = useApi();

// Function to send a demo email
const sendDemoEmail = async () => {
  if (!email.value) {
    console.error("Email is required to send a demo.");
    return;
  }
  isSending.value = true;
  try {
    await axios.post("/admin/demo/send", {
      email: email.value,
      content: content.value,
    });
    // Optionally, show a success notification here
    console.log("Demo email sent successfully!");
    // Clear the form fields after a successful send
    email.value = "";
    content.value = "";
  } catch (error) {
    console.error("Error sending demo email:", error);
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
          <v-form>
            <!-- Email Field -->
            <v-text-field
              label="Email"
              v-model="email"
              placeholder="Enter recipient email"
              required
              class="mb-3"
            />

            <!-- Optional Content Field -->
            <v-textarea
              label="Content (Optional)"
              v-model="content"
              placeholder="Enter optional content"
              class="mb-3"
            />

            <!-- Send Button with Loading Indicator -->
            <v-btn color="primary" :loading="isSending" @click="sendDemoEmail">
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
