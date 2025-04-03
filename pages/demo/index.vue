<script setup lang="ts">
useHead({
  title: "Demo requests",
});

import RejectIcon from "~icons/material-symbols/close-rounded";
import AcceptIcon from "~icons/material-symbols/check-rounded";

// Define types
interface Request {
  id: number;
  email: string;
  company_name: string;
  message: string;
  approved: boolean | null;
  key: string | null;
  expired_key: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

// API instance
const axios = useApi();
const notifier = useSnackbarStore();

// Reactive state for storing requests
const requests = ref<Request[]>([]);

// Fetch data from API
const fetchRequests = async () => {
  try {
    const { data } = await axios.get("/admin/demo/list"); // Replace with your actual API
    if (data) {
      requests.value = data as Request[];
    }
  } catch (error) {
    console.error("Error fetching requests:", error);
    notifier.handleCatch(error);
  }
};

// Handle approve/reject actions
const updateRequestStatus = async (id: number, status: boolean) => {
  const vote = status ? "approve" : "reject";

  try {
    await axios.put(`/admin/demo/vote/${id}/${vote}`);

    // Update UI state
    const request = requests.value.find((r: Request) => r.id === id);
    if (request) request.approved = status;

    notifier.showMessage("Request updated!", "success");
  } catch (error) {
    console.error(`Error updating request ${id} to ${vote}:`, error);
    notifier.handleCatch(error);
  }
};

// Load data on component mount
onMounted(fetchRequests);
</script>

<template>
  <SharedUiParentCard title="Demo requests">
    <v-container class="px-6">
      <v-data-table
        :headers="[
          { title: 'ID', key: 'id' },
          { title: 'Email', key: 'email' },
          { title: 'Company Name', key: 'company_name' },
          { title: 'Message', key: 'message' },
          { title: 'Created At', key: 'created_at' },
          { title: 'Approved', key: 'approved' },
          { title: 'Actions', key: 'actions', sortable: false },
        ]"
        :items="requests"
        item-value="id"
        class="elevation-1 rounded"
      >
        <!-- Status Chip -->
        <template #[`item.approved`]="{ item }">
          <v-chip
            :color="
              item.approved === null ? 'grey' : item.approved ? 'green' : 'red'
            "
            dark
          >
            {{
              item.approved === null
                ? "Pending"
                : item.approved
                ? "Approved"
                : "Rejected"
            }}
          </v-chip>
        </template>

        <!-- Action Buttons -->
        <template #[`item.actions`]="{ item }">
          <v-btn
            color="green"
            variant="outlined"
            size="small"
            class="mr-2"
            @click="updateRequestStatus(item.id, true)"
            icon
            :disabled="item.approved !== null"
          >
            <v-icon :icon="AcceptIcon"></v-icon>
          </v-btn>

          <v-btn
            color="red"
            variant="outlined"
            size="small"
            @click="updateRequestStatus(item.id, false)"
            icon
            :disabled="item.approved !== null"
          >
            <v-icon :icon="RejectIcon"></v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-container>
  </SharedUiParentCard>
</template>

<style scoped></style>
