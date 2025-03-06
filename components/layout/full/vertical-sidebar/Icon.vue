<script setup>
const props = defineProps({
  item: Object,
  level: Number,
  size: { type: Number, default: 20 },
});
</script>

<template>
  <component
    :is="item"
    class="iconClass"
    :style="{ fontSize: props.size }"
  ></component>
</template>
