<script setup lang="ts">
// Define the Email interface
interface Email {
  id: number;
  recipient: string;
  subject: string;
  content: string;
  sent_at: string;
  status: string; // e.g. "sent", "failed"
}

// Reactive state
const emails = ref<Email[]>([]);
const isLoading = ref(false);

// API instance
const axios = useApi();

// Fetch recent emails from your API
const fetchEmails = async () => {
  isLoading.value = true;
  try {
    const { data } = await axios.get("/api/recent-emails"); // Replace with your actual endpoint
    if (data) {
      emails.value = data as Email[];
    }
  } catch (error) {
    console.error("Error fetching emails:", error);
  } finally {
    isLoading.value = false;
  }
};

// Compute statistics
const totalEmails = computed(() => emails.value.length);
const sentEmails = computed(
  () => emails.value.filter((email) => email.status === "sent").length
);
const failedEmails = computed(
  () => emails.value.filter((email) => email.status === "failed").length
);

// Utility function for a short content preview (limit to 50 characters)
const getPreview = (content: string) => {
  return content.length > 50 ? content.substring(0, 50) + "..." : content;
};

onMounted(() => {
  fetchEmails();
});
</script>

<template>
  <SharedUiParentCard title="Recent Emails">
    <v-container class="px-6">
      <!-- Statistics Cards -->
      <v-row class="mb-4">
        <v-col cols="12" sm="4">
          <v-card>
            <v-card-text class="text-center">
              <h3>Total Emails</h3>
              <p>{{ totalEmails }}</p>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" sm="4">
          <v-card>
            <v-card-text class="text-center">
              <h3>Sent Emails</h3>
              <p>{{ sentEmails }}</p>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" sm="4">
          <v-card>
            <v-card-text class="text-center">
              <h3>Failed Emails</h3>
              <p>{{ failedEmails }}</p>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- Data Table for Emails -->
      <v-data-table
        :headers="[
          { title: 'ID', key: 'id' },
          { title: 'Recipient', key: 'recipient' },
          { title: 'Subject', key: 'subject' },
          { title: 'Content Preview', key: 'preview' },
          { title: 'Sent At', key: 'sent_at' },
          { title: 'Status', key: 'status' },
        ]"
        :items="emails"
        :loading="isLoading"
        class="elevation-1 rounded"
      >
        <!-- Content Preview Column -->
        <template #[`item.preview`]="{ item }">
          {{ getPreview(item.content) }}
        </template>

        <!-- Status Column with a Chip -->
        <template #[`item.status`]="{ item }">
          <v-chip :color="item.status === 'sent' ? 'green' : 'red'" dark>
            {{ item.status }}
          </v-chip>
        </template>
      </v-data-table>
    </v-container>
  </SharedUiParentCard>
</template>

<style scoped>
/* Add any custom styles if needed */
</style>
