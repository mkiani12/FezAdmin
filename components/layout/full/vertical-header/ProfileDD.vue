<script setup lang="ts">
import UserIcon from "~icons/material-symbols/account-circle-full";

const { signOut, data } = useAuth();

const selectedJob = useCookie("op:selected-job");

const logout = () => {
  const cookies = {
    selectedJob: useCookie("op:selected-job"),
  };

  signOut({ callbackUrl: "/auth/login" }).then(() => {
    cookies.selectedJob.value = null;
  });
};
</script>

<template>
  <!-- ---------------------------------------------- -->
  <!-- notifications DD -->
  <!-- ---------------------------------------------- -->
  <v-menu
    :close-on-content-click="false"
    origin="top right"
    location="bottom end"
  >
    <template v-slot:activator="{ props }">
      <v-btn
        class="profileBtn custom-hover-primary"
        variant="text"
        v-bind="props"
        icon
      >
        <v-avatar size="35" color="gray">
          <v-icon :icon="UserIcon" :size="24" />
        </v-avatar>
      </v-btn>
    </template>
    <v-sheet rounded="md" elevation="10" class="mt-2" min-width="200">
      <div class="pt-4 pb-4 px-5 text-center">
        <v-btn
          to="/auth/login"
          color="primary"
          variant="outlined"
          block
          @click="logout"
        >
          خروج
        </v-btn>
      </div>
    </v-sheet>
  </v-menu>
</template>
