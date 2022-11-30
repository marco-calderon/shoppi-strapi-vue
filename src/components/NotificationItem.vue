<script setup lang="ts">
import IconButton from "./IconButton.vue";
import { Icon } from "@iconify/vue";

export interface NotificationItemProps {
  message: string;
  body: string;
  type?: "success" | "info" | "warn" | "error";
}

const props = defineProps<NotificationItemProps>();
</script>

<template lang="">
  <div
    class="relative flex flex-col w-[400px] p-8 rounded-lg bg-slate-300 dark:bg-slate-600 gap-4 items-start"
  >
    <IconButton class="absolute top-4 right-4" @click="$emit('remove')">
      <Icon icon="icon-park-twotone:close-one" class="text-lg" />
    </IconButton>
    <h3 class="mr-4 text-lg font-bold text-gray-800 dark:text-gray-200">
      {{ props.message }}
    </h3>
    <p class="text-base text-gray-800 dark:text-gray-200">{{ props.body }}</p>
  </div>
</template>
