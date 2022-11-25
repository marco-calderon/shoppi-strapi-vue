<script setup lang="ts">
import CategoriesList from "@/components/CategoriesList.vue";
</script>

<template>
  <main class="flex flex-col gap-4 p-8">
    <!-- Hero component -->
    <div
      class="flex flex-row items-center px-12 text-gray-600 rounded-3xl bg-gradient-to-r from-lime-400 to-lime-700 h-72"
    >
      <div class="flex flex-col items-start">
        <h1 class="text-6xl font-bold text-gray-700">55% Discount</h1>
        <p class="text-xl text-gray-700">In selected products</p>
      </div>
    </div>

    <CategoriesList />
  </main>
</template>
