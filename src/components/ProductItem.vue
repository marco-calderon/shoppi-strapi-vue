<script setup lang="ts">
export interface ProductItemProps {
  name: string;
  description: string;
  url: string;
  price: number;
  discount: number;
  category: string;
}

defineProps<ProductItemProps>();
</script>

<template lang="">
  <div
    class="transition-all bg-gray-300 shadow-lg cursor-pointer dark:bg-gray-800 rounded-2xl hover:-translate-y-2 hover:shadow-lg hover:shadow-gray-500/50"
  >
    <img class="object-cover h-72 rounded-2xl" :src="url" />
    <h3 class="px-12 py-8 text-2xl font-bold text-center">{{ name }}</h3>
  </div>
</template>
