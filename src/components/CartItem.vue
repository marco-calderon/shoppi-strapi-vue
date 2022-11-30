<script setup lang="ts">
import IconButton from './IconButton.vue';
import { Icon } from '@iconify/vue';

export interface CartItemProps {
  name: string;
  url: string;
  price: number;
}

const props = defineProps<CartItemProps>();
</script>
<template lang="">
  <div class="flex flex-row items-center justify-between w-full px-4 py-2 transition-all hover:bg-gray-300 dark:hover:bg-gray-600">
    <div class="flex flex-row items-center gap-4">
      <img :src="props.url" :alt="props.name" class="object-cover w-8 h-8 rounded-md" />
      <h4 class="text-md">{{ props.name }}</h4>
    </div>

    <!-- Actions -->
    <IconButton @click="remove">
      <Icon icon="icon-park-twotone:delete-five" class="text-2xl text-red-500" />
    </IconButton>
  </div>
</template>