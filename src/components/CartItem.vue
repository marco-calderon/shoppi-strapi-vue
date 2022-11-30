<script setup lang="ts">
import IconButton from "./IconButton.vue";
import { Icon } from "@iconify/vue";
import { computed } from "vue";
import { formatPice } from "@/utils/format.utils";

export interface CartItemProps {
  name: string;
  url: string;
  price: number;
}

const props = defineProps<CartItemProps>();
const price = computed(() => formatPice(props.price));
</script>
<template lang="">
  <div
    class="flex flex-row items-center justify-between w-full px-4 py-2 transition-all hover:bg-gray-300 dark:hover:bg-gray-600"
  >
    <div class="flex flex-row items-center gap-4">
      <img
        :src="props.url"
        :alt="props.name"
        class="object-cover w-8 h-8 rounded-md"
      />
      <h4 class="text-md">{{ props.name }} - {{ price }}</h4>
    </div>

    <!-- Actions -->
    <IconButton @click="$emit('remove')">
      <Icon
        icon="icon-park-twotone:delete-five"
        class="text-2xl text-red-500"
      />
    </IconButton>
  </div>
</template>
