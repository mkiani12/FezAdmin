<script setup lang="ts">
useHead({
  title: "Recent Emails",
});

// Email shape
interface Email {
  id: number;
  receiver: string;
  subject: string;
  content: string;
  created_at: string; // changed from sent_at to created_at
  status: string; // e.g. "sent", "failed"
  status_updated_at: string;
  deleted_at: string | null;
  updated_at: string;
  user_id: number;
}

// State variables
const emails = ref<Email[]>([]);
const isLoading = ref(false);

// API setup
const axios = useApi();
const notifier = useSnackbarStore();

// Fetch emails from API
const fetchEmails = async () => {
  isLoading.value = true;
  try {
    const { data } = await axios.get("/admin/email/history");

    if (data) {
      emails.value = data as Email[];
    }
  } catch (error) {
    console.error("Error fetching emails:", error);
    notifier.handleCatch(error);
  } finally {
    isLoading.value = false;
  }
};

// Compute email stats
const totalEmails = computed(() => emails.value.length);
const sentEmails = computed(
  () => emails.value.filter((email) => email.status === "sent").length
);
const failedEmails = computed(
  () => emails.value.filter((email) => email.status === "failed").length
);

// Shorten content to 50 characters max
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
      <!-- Stats Cards -->
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

      <!-- Email Data Table -->
      <v-data-table
        :headers="[
          { title: 'ID', key: 'id' },
          { title: 'Receiver', key: 'receiver' },
          { title: 'Subject', key: 'subject' },
          { title: 'Content Preview', key: 'preview' },
          { title: 'Created At', key: 'created_at' },
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

        <!-- Status Column with Chip -->
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
