<template>
  <div
    class="fixed z-10 flex flex-row items-center justify-between w-full px-16 py-8 overflow-hidden bg-gray-200/30 backdrop-blur-md dark:bg-gray-900/60"
  >
    <h1
      class="text-2xl font-bold text-gray-800 cursor-pointer dark:text-white"
      @click="$emit('logoClick')"
    >
      Odyssey
    </h1>

    <div class="hidden md:flex md:w-[400px]">
      <div
        class="relative flex flex-row items-center w-full bg-white rounded-full dark:bg-gray-800"
      >
        <button
          @click="$emit('onSearch')"
          placeholder="Search anything..."
          class="w-full px-8 py-4 text-black transition-all bg-white border-none rounded-full shadow-lg outline-none text-start z-60 focus:shadow-gray-300/30 dark:bg-gray-800 dark:text-white focus:border-none active:border-none"
        >
          Search anything...
        </button>

        <Icon
          icon="icon-park-twotone:search"
          class="absolute my-auto right-8"
        />
      </div>
    </div>

    <div class="flex flex-row items-center gap-2">
      <IconButton @click="$emit('cartClick')">
        <Icon
          icon="icon-park-twotone:shopping"
          class="text-2xl text-gray-800 dark:text-gray-300"
        />
      </IconButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from "@iconify/vue";
import IconButton from "./IconButton.vue";
</script>
