<script setup lang="ts">
export interface IconButtonProps {
  class?: string;
}
defineProps<IconButtonProps>();
</script>
<template lang="">
  <button
    :class="`p-2 rounded-full hover:bg-gray-400 dark:hover:bg-slate-700 transition-all ${props?.class}`"
  >
    <slot />
  </button>
</template>
