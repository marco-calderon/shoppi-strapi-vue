<script lang="ts">
export default {
  props: {
    name: String,
    description: String,
    url: String,
  },
};
</script>
<template lang="">
  <div class="bg-gray-300 shadow-lg dark:bg-gray-800 rounded-2xl">
    <img class="object-cover h-72 rounded-2xl" :src="url" />
    <h3 class="px-12 py-4 text-2xl font-bold text-center">{{ name }}</h3>
  </div>
</template>
