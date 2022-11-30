<template>
  <div
    class="fixed z-10 flex flex-row items-center justify-between w-full px-16 py-8 bg-gray-200/30 backdrop-blur-md dark:bg-gray-900/60"
  >
    <h1 class="text-2xl font-bold text-white" @click="$emit('logoClick')">
      Odyssey
    </h1>

    <div class="hidden md:flex md:w-[400px]">
      <div
        class="relative flex flex-row items-center w-full bg-white rounded-full dark:bg-gray-800"
      >
        <button
          @click="focused = true"
          placeholder="Search anything..."
          class="w-full px-8 py-4 text-black transition-all bg-white border-none rounded-full shadow-lg outline-none z-60 focus:shadow-gray-300/30 dark:bg-gray-800 dark:text-white focus:border-none active:border-none"
        >
          Search anything...
        </button>

        <Icon
          icon="icon-park-twotone:search"
          class="absolute my-auto right-8"
        />
      </div>
    </div>

    <div></div>
  </div>

  <div
    :class="`absolute flex flex-col items-center mx-auto bg-white rounded-lg shadow-lg dark:bg-gray-800 shadow-gray-300/30 dark:shadow-gray-500/30 w-[400px] md:w-[700px] top-8 z-50 h-48 ${
      focused ? 'visible' : 'hidden'
    }`"
    v-on-click-outside="closeModal"
  >
    <input
      v-model="searchTerm"
      placeholder="Search anything..."
      class="px-8 py-4 text-black transition-all w-[400px] bg-white border-none rounded-full shadow-lg outline-none z-60 focus:shadow-gray-300/30 dark:bg-gray-800 dark:text-white focus:border-none active:border-none"
    />
  </div>
</template>

<script setup lang="ts">
import type { ProductModel } from "@/models/Product.model";
import { Icon } from "@iconify/vue";
import { useQuery } from "@vue/apollo-composable";
import gql from "graphql-tag";
import { computed, ref, type Ref } from "vue";
import { vOnClickOutside } from "@vueuse/components";

const target = ref(null);
const searchTerm = ref("");
const focused = ref(false);
const { result } = useQuery(
  gql`
    query searchProduct($nameLike: String) {
      products(filters: { name: { containsi: $nameLike } }) {
        data {
          id
          attributes {
            name
            price
            image {
              data {
                attributes {
                  url
                }
              }
            }
            category {
              data {
                id
                attributes {
                  name
                }
              }
            }
          }
        }
      }
    }
  `,
  () => ({
    nameLike: searchTerm,
  })
);
const products = computed<ProductModel>(() => result.value?.products?.data);

function closeModal() {
  console.log("closing modal");
  focused.value = false;
}
</script>
