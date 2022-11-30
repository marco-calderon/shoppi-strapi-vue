<template lang="">
  <div class="flex flex-row items-center justify-start w-full gap-4 px-8 py-4 cursor-pointer border-b-1 hover:bg-gray-300 dark:hover:bg-gray-500/30">
    <img :src="props.url" alt="props.name" class="object-cover w-12 h-12 rounded-md" />
    <h4 class="text-lg">{{ props.name }}</h4>
  </div>
</template>
<script setup lang="ts">
export interface SearchResultProps {
  name: string;
  price: string;
  url: string;
}
const props = defineProps<SearchResultProps>();
</script>
