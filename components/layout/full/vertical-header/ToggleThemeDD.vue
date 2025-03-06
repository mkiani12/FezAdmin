<script setup lang="ts">
import ThemeSwitcher from "../../../tools/ThemeSwitcher.vue";

import DarkIcon from "~icons/line-md/moon-alt-loop";
import LightIcon from "~icons/line-md/moon-alt-to-sunny-outline-loop-transition";

interface ThemeSwitcherTheme {
  name: string;
  icon: string | any;
}

const themes: ThemeSwitcherTheme[] = [
  {
    name: "light",
    icon: LightIcon,
  },
  {
    name: "dark",
    icon: DarkIcon,
  },
];
</script>

<template>
  <ThemeSwitcher :themes="themes" />
</template>
