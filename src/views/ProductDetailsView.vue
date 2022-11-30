<script setup lang="ts">
import type { ProductModel } from "@/models/Product.model";
import { useQuery } from "@vue/apollo-composable";
import gql from "graphql-tag";
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
import { formatPice } from "@/utils/format.utils";
import { marked } from "marked";
import { Icon } from "@iconify/vue";

const mapLevelToClass = (level: number) => {
  switch (level) {
    case 1:
      return "text-5xl";
    case 2:
      return "text-4xl";
    case 3:
      return "text-3xl";
    case 4:
      return "text-2xl";
    case 5:
      return "text-1xl";
    case 6:
      return "text-xl";
    default:
      return "text-base";
  }
};

const route = useRoute();
const { result } = useQuery(
  gql`
    query product($productId: ID) {
      product(id: $productId) {
        data {
          id
          attributes {
            name
            description
            price
            discount
            points
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
    productId: route.params.id,
  }
);
const markerRef = ref<typeof marked>(marked);
markerRef.value.use({
  renderer: {
    paragraph: (text: string) => `<p class="mb-4">${text}</p>`,
    listitem: (text: string) => `<li class="mb-2 ml-4">${text}</li>`,
    heading: (text: string, level: number) =>
      `<h${level} class="${mapLevelToClass(level)} mb-4">${text}</h${level}>`,
  },
});

const product = computed<ProductModel>(() => result.value?.product?.data);
const price = computed(() => formatPice(product?.value?.attributes.price));
const rendered = computed(() =>
  markerRef.value(product?.value?.attributes.description ?? "")
);
const pointsRendered = computed(() =>
  markerRef.value(product?.value?.attributes.points ?? "")
);
</script>

<template>
  <main class="flex flex-col gap-4 p-8">
    <div class="flex flex-col">
      <div class="flex flex-row gap-8">
        <div class="w-[500px] h-[500px] md:w-[700px] flex flex-col gap-8">
          <img
            class="rounded-lg shadow-lg object-fit bg-gray-300/30"
            :src="product?.attributes.image.data.attributes.url"
            :alt="product?.attributes.name"
          />

          <div
            class="w-full p-4 bg-gray-300 rounded-lg shadow-lg dark:bg-gray-800 shadow-gray-400/30 dark:shadow-gray-600/30"
            v-html="pointsRendered"
          ></div>
        </div>
        <div class="flex flex-col w-full gap-8 p-12">
          <div class="flex flex-row items-center justify-between">
            <h1 class="text-5xl font-semibold">
              {{ product?.attributes.name }}
            </h1>

            <button
              type="button"
              class="flex flex-row items-center gap-4 px-6 py-4 text-xl font-bold text-gray-800 bg-yellow-400 rounded-full shadow-lg shadow-yellow-200/50"
            >
              <Icon icon="ic:sharp-shopping-cart" />
              Add to cart
            </button>
          </div>

          <h3 class="text-2xl font-bold">{{ price }}</h3>
          <div v-html="rendered"></div>
        </div>
      </div>
    </div>
  </main>
</template>
