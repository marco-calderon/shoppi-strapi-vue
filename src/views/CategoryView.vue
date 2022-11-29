<script setup lang="ts">
import ProductsList from "@/components/ProductsList.vue";
</script>

<template>
  <main class="flex flex-col gap-4 p-8">
    <h1 class="text-2xl text-black dark:text-white"></h1>

    <ProductsList :category-id="parseInt($route.params.id as string)" />
  </main>
</template>
