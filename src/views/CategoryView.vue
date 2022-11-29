<script setup lang="ts">
import ProductsList from "@/components/ProductsList.vue";
</script>

<template>
  <main class="flex flex-col gap-4 p-8">
    <ProductsList :category-id="parseInt($route.params.id as string)" />
  </main>
</template>
