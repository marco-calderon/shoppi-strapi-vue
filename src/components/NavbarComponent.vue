<template>
  <div
    class="fixed z-10 flex flex-row items-center justify-between w-full px-12 py-4 bg-gray-200/30 backdrop-blur-md dark:bg-gray-900/30"
  >
    <h1 class="text-xl" @click="$emit('logoClick')">Logo</h1>
  </div>
</template>

<script lang="ts">
export default {
  emits: ["logoClick"],
};
</script>
