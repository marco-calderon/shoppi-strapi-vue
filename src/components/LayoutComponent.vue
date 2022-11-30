<script setup lang="ts">
import NavbarComponent from "./NavbarComponent.vue";
import type { ProductModel } from "@/models/Product.model";
import { Icon } from "@iconify/vue";
import { useQuery } from "@vue/apollo-composable";
import gql from "graphql-tag";
import { computed, ref } from "vue";
import { vOnClickOutside } from "@vueuse/components";
import SearchResult from "./SearchResult.vue";
import { useRouter } from "vue-router";
import { Motion, Presence } from "motion/vue";
import CartItem from "./CartItem.vue";
import { useCartStore } from "@/store/useCartStore";

const router = useRouter();
const searchTerm = ref("");
const focused = ref(false);
const cartModal = ref(false);
const store = useCartStore();
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
  `, {
    nameLike: searchTerm,
  }
);
const products = computed<ProductModel[]>(
  () => result.value?.products?.data ?? []
);

function closeModal() {
  searchTerm.value = "";
  focused.value = false;
}

function closeCart() {
  cartModal.value = false;
}

function productClick(product: ProductModel) {
  router.push(`/products/${product.id}`);
  focused.value = false;
}
</script>

<template>
  <div class="flex flex-col w-full bg-gray-200 dark:bg-gray-900">
    <NavbarComponent
      @on-search="focused = true"
      @logo-click="router.push('/')"
      @cart-click="cartModal = true"
    />
    <div class="mt-24">
      <slot />
    </div>
  </div>

  <!-- Search modal -->
  <!-- Overlay -->
  <div
    :class="`absolute left-0 right-0 flex flex-col items-center top-0 bottom-0 bg-gray-900/60 z-50 ${
      focused ? 'visible' : 'hidden'
    }`"
  >
    <!-- Modal -->
    <div
      class="relative flex flex-col z-60 items-center mt-4 z-50 bg-white rounded-lg dark:bg-gray-700 w-[400px] md:w-[700px]"
      v-on-click-outside="closeModal">
      <div class="relative flex flex-row items-center w-auto rounded-full z-60">
        <input
          v-model="searchTerm"
          placeholder="Search anything..."
          class="px-8 py-4 mt-4 text-black transition-all w-[400px] bg-white border-none rounded-full shadow-lg outline-none z-60 focus:shadow-gray-300/30 dark:bg-gray-600 dark:text-white focus:border-none active:border-none" />

        <Icon icon="icon-park-twotone:search" class="absolute mt-4 right-8" />
      </div>

      <div class="flex flex-col w-full mt-4">
        <SearchResult
          v-for="product in products"
          :key="product?.id"
          :name="product?.attributes.name"
          :price="'100'"
          :url="product?.attributes.image.data.attributes.url"
          @click="productClick(product)"
        />
      </div>
    </div>
  </div>

  <!-- Cart modal -->
  <Presence>
    <Motion
      v-show="cartModal"
      class="absolute top-20 py-4 right-4 flex flex-col z-60 items-center mt-4 z-50 bg-white rounded-lg dark:bg-gray-700 w-[350px] h-24"
      :animate="{ opacity: 1 }"
      :exit="{ opacity: 0 }"
      v-on-click-outside="closeCart">
      <h3 class="text-lg">Your cart</h3>

      <div class="flex flex-col items-center w-full pb-4">
        <CartItem
          v-for="product in store.items"
          :key="product.id"
          :name="product.attributes.name"
          :price="product.attributes.price"
          :url="product.attributes.image.data.attributes.url"
          @remove="store.removeFromCart(product.id)"
        />
      </div>
    </Motion>
  </Presence>
</template>
