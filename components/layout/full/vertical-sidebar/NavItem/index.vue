<script setup>
import Icon from "../Icon.vue";
const props = defineProps({ item: Object, size: Number });
</script>

<template>
  <!---Single Item-->
  <v-list-item
    :to="item.to"
    rounded
    class="mb-1"
    color="primary"
    :disabled="item.disabled"
    exact
    :target="item.type === 'external' ? '_blank' : ''"
  >
    <!---If icon-->
    <template v-slot:prepend>
      <Icon :item="item.icon" :size="size" />
    </template>
    <v-list-item-title>{{ item.title }}</v-list-item-title>
    <!---If Caption-->
    <v-list-item-subtitle v-if="item.subCaption" class="text-caption hide-menu">
      {{ item.subCaption }}
    </v-list-item-subtitle>
    <!---If any chip or label-->
    <template v-slot:append v-if="item.chip">
      <v-chip
        :color="item.chipColor"
        class="sidebarchip hide-menu"
        :size="'small'"
        :variant="item.chipVariant"
        :prepend-icon="item.chipIcon"
      >
        {{ item.chip }}
      </v-chip>
    </template>
  </v-list-item>
</template>
