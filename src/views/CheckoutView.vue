<script setup lang="ts">
import CheckoutItem from "@/components/CheckoutItem.vue";
import { useCartStore } from "@/store/useCartStore";
import { formatPice } from "@/utils/format.utils";
import { Icon } from "@iconify/vue";
import { computed } from "vue";

const store = useCartStore();

const subtotal = computed(() =>
  store.items.map((i) => i.attributes.price).reduce((i, a) => i + a, 0)
);
const tax = computed(() => subtotal.value * 0.1);
const total = computed(() => subtotal.value + tax.value);
</script>

<template>
  <main class="flex flex-col gap-4 p-8">
    <h1 class="text-5xl">Checkout</h1>

    <div class="flex flex-col md:flex-row">
      <div class="flex flex-col items-start w-full md:w-1/2">
        <CheckoutItem
          v-for="item of store.items"
          :key="item.id"
          :name="item.attributes.name"
          :price="item.attributes.price"
          :url="item.attributes.image.data.attributes.url"
        />
      </div>

      <div class="flex flex-col items-start w-full gap-8 md:w-1/2">
        <h3 class="text-3xl font-semibold">Invoice</h3>

        <div class="flex flex-row items-center justify-between w-full text-2xl">
          <p>Subtotal</p>

          <p class="font-bold">{{ formatPice(subtotal) }}</p>
        </div>

        <div class="flex flex-row items-center justify-between w-full text-2xl">
          <p>Tax</p>

          <p class="font-bold">{{ formatPice(tax) }}</p>
        </div>

        <div class="flex flex-row items-center justify-between w-full text-4xl">
          <h3 class="font-bold">Grand total</h3>

          <h3 class="font-bold">{{ formatPice(total) }}</h3>
        </div>

        <button
          type="button"
          :disabled="total === 0"
          class="flex flex-row items-center justify-center w-full gap-4 px-8 py-4 mt-8 text-4xl transition-all bg-green-500 rounded-full shadow-lg disabled:bg-gray-500 disabled:hover:shadow-gray-300/30 hover:shadow-green-300/30"
        >
          <Icon icon="icon-park-twotone:check-one" />
          Confirm and pay
        </button>
      </div>
    </div>
  </main>
</template>
