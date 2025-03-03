<script setup lang="ts">
import { useTheme } from "vuetify";
import DarkLogo from "~/assets/images/logo/logo-black.svg";
import LightLogo from "~/assets/images/logo/logo.svg";
const theme = useTheme();

const props = defineProps({
  height: {
    type: String,
    default: "40",
  },
});
</script>
<template>
  <div class="logo">
    <NuxtLink to="/">
      <img
        v-if="theme.global.current.value.dark"
        :src="LightLogo"
        :height="props.height"
      />
      <img v-else :height="props.height" :src="DarkLogo" />
    </NuxtLink>
  </div>
</template>
