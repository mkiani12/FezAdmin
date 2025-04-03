<script setup lang="ts">
import { ref } from "vue";
const { signIn } = useAuth();
const notifier = useSnackbarStore();
/*-For Set Blank Layout-*/
definePageMeta({
  layout: "blank",
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: "/",
  },
});

const checkbox = ref(true);
const email = ref("");
const password = ref("");
const loading = ref(false);

const login = async () => {
  loading.value = true;
  const credential = {
    email: email.value,
    password: password.value,
  };
  signIn(credential, { callbackUrl: "/" })
    .then(() => {
      loading.value = false;
    })
    .catch((e) => {
      loading.value = false;
      notifier.handleCatch(e);
    });
};
</script>
<template>
  <div class="authentication">
    <v-container fluid class="pa-3">
      <v-row class="h-100vh d-flex justify-center align-center">
        <v-col cols="12" lg="4" xl="3" class="d-flex align-center">
          <v-card
            rounded="md"
            elevation="10"
            class="px-sm-1 px-0 withbg mx-auto"
            max-width="500"
          >
            <v-card-item class="pa-sm-8">
              <div class="d-flex justify-center py-4">
                <LayoutFullLogo height="60" />
              </div>
              <div class="text-body-1 text-muted text-center mb-3">
                Free & Easy
              </div>

              <v-row class="d-flex mb-3">
                <v-col cols="12">
                  <v-text-field
                    v-model="email"
                    label="Email"
                    color="primary"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="password"
                    label="Password"
                    type="password"
                    color="primary"
                    @keydown.enter="login"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" class="pt-0">
                  <div class="d-flex flex-wrap align-center mr-n2">
                    <v-checkbox v-model="checkbox" color="primary">
                      <template v-slot:label class="text-body-1">
                        Remember me
                      </template>
                    </v-checkbox>
                    <div class="ml-sm-auto">
                      <NuxtLink
                        to="/auth/forget-password"
                        class="text-primary text-decoration-none text-body-1 opacity-1 font-weight-medium"
                      >
                        Forgot password
                      </NuxtLink>
                    </div>
                  </div>
                </v-col>
                <v-col cols="12" class="pt-0">
                  <v-btn
                    color="primary"
                    size="large"
                    block
                    flat
                    :loading="loading"
                    @click="login"
                  >
                    Login
                  </v-btn>
                </v-col>
              </v-row>
            </v-card-item>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
