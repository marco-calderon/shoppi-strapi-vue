<script setup lang="ts">
import { formatPice } from "@/utils/format.utils";
import { computed } from "vue";
import { Icon } from "@iconify/vue";
import IconButton from "./IconButton.vue";

export interface ProductItemProps {
  name: string;
  description: string;
  url: string;
  price: number;
  discount?: number;
}

const props = defineProps<ProductItemProps>();
const price = computed<string>(() => formatPice(props.price));

function favorite() {
  console.log(`Liked ${props.name}`);
}
</script>

<template lang="">
  <div
    class="transition-all bg-gray-300 shadow-lg cursor-pointer dark:bg-gray-800 rounded-2xl hover:shadow-lg hover:shadow-gray-500/50"
  >
    <img class="object-cover w-full h-72 rounded-2xl" :src="url" />

    <div class="flex flex-col gap-4 p-8">
      <h4 class="text-base font-bold">{{ name }}</h4>

      <div class="flex flex-row items-center justify-between">
        <h3 class="text-2xl font-bold">{{ price }}</h3>

        <IconButton @click.stop="favorite">
          <Icon icon="ph:heart-duotone" class="text-2xl" />
        </IconButton>
      </div>
    </div>
  </div>
</template>
