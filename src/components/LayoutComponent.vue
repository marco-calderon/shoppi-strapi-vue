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
import { formatPice } from "@/utils/format.utils";
import { useNotificationStore } from "@/store/useNotificationStore";
import NotificationItem from "./NotificationItem.vue";

const router = useRouter();
const searchTerm = ref("");
const focused = ref(false);
const cartModal = ref(false);
const store = useCartStore();
const notificationStore = useNotificationStore();
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
  {
    nameLike: searchTerm,
  }
);
const products = computed<ProductModel[]>(
  () => result.value?.products?.data ?? []
);

const total = computed(() =>
  formatPice(
    store.items.map((p) => p.attributes.price).reduce((i, acc) => i + acc, 0)
  )
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
      v-on-click-outside="closeModal"
    >
      <div class="relative flex flex-row items-center w-auto rounded-full z-60">
        <input
          v-model="searchTerm"
          placeholder="Search anything..."
          class="px-8 py-4 mt-4 text-black transition-all w-[400px] bg-white border-none rounded-full shadow-lg outline-none z-60 focus:shadow-gray-300/30 dark:bg-gray-600 dark:text-white focus:border-none active:border-none"
        />

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
      class="absolute top-20 py-4 right-4 flex flex-col z-60 items-center mt-4 z-50 bg-white rounded-lg dark:bg-gray-700 w-[350px] min-h-24"
      :animate="{ opacity: 1 }"
      :exit="{ opacity: 0 }"
      v-on-click-outside="closeCart"
    >
      <h3 class="mb-4 text-lg">
        Your cart {{ store.items.length > 0 ? `(${store.items.length})` : "" }}
      </h3>

      <div
        v-if="store.items.length > 0"
        class="flex flex-col items-center w-full"
      >
        <CartItem
          v-for="product in store.items"
          :key="product.id"
          :name="product.attributes.name"
          :price="product.attributes.price"
          :url="product.attributes.image.data.attributes.url"
          @remove="store.removeFromCart(product.id)"
        />

        <span class="w-full h-[1px] my-4 bg-gray-400 dark:bg-gray-500" />

        <h4 class="text-lg">
          Total: <b>{{ total }}</b>
        </h4>

        <button
          type="button"
          class="flex flex-row items-center gap-4 px-6 py-4 mt-8 text-white transition-all bg-blue-500 rounded-full hover:bg-blue-400"
        >
          <Icon icon="icon-park-twotone:check-one" class="text-lg" />
          Checkout
        </button>
      </div>

      <div
        v-if="store.items.length === 0"
        class="flex flex-col items-center justify-center h-48 gap-8 pb-8"
      >
        <Icon
          icon="icon-park-twotone:canned-fruit"
          class="text-4xl text-gray-500"
        />
        <h2 class="text-xl text-center text-gray-500 dark:text-gray-500">
          Your cart is empty. Go shopping!
        </h2>
      </div>
    </Motion>
  </Presence>

  <TransitionGroup
    name="list"
    class="absolute top-0 z-50 flex flex-col items-center w-full gap-4 mx-auto mt-4 pointer-events-none"
    tag="ul"
  >
    <li
      v-for="notification of notificationStore.notifications"
      :key="notification.id"
      class="pointer-events-auto"
    >
      <NotificationItem
        :message="notification.message"
        :body="notification.body"
        @remove="notificationStore.removeNotification(notification.id)"
      />
    </li>
  </TransitionGroup>
</template>

<style>
.list-move, /* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.list-leave-active {
  position: absolute;
}
</style>
