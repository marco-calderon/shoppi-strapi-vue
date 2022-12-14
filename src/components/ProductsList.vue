<script setup lang="ts">
import { useQuery } from "@vue/apollo-composable";
import type { CategoryModel } from "@/models/Category.model";
import gql from "graphql-tag";
import ProductItem from "./ProductItem.vue";
import { computed } from "vue";
import type { ProductModel } from "@/models/Product.model";
import { useRouter } from "vue-router";

export interface ProductsListProps {
  categoryId: number;
}

const props = defineProps<ProductsListProps>();
const router = useRouter();
const { result } = useQuery(
  gql`
    query productsByCategory($categoryId: ID) {
      products(filters: { category: { id: { eq: $categoryId } } }) {
        data {
          id
          attributes {
            name
            description
            price
            discount
            image {
              data {
                attributes {
                  url
                }
              }
            }
          }
        }
      }
    }
  `,
  {
    categoryId: props.categoryId,
  }
);

const { result: categoryResult } = useQuery(
  gql`
    query category($categoryId: ID) {
      category(id: $categoryId) {
        data {
          id
          attributes {
            name
            description
            cover {
              data {
                id
                attributes {
                  url
                }
              }
            }
          }
        }
      }
    }
  `,
  {
    categoryId: props.categoryId,
  }
);

const products = computed<ProductModel[]>(
  () => result.value?.products?.data ?? []
);
const category = computed<CategoryModel>(
  () => categoryResult.value?.category?.data
);

function productClick(product: ProductModel) {
  router.push(`/products/${product.id}`);
}
</script>

<template>
  <div class="flex flex-col gap-6">
    <h3 class="mb-4 text-4xl font-bold">{{ category?.attributes.name }}</h3>

    <div class="grid gap-8 lg:grid-cols-4 md:grid-cols-4 sm:grid-cols-2">
      <ProductItem
        v-for="product in products"
        :key="product.id"
        :name="product.attributes.name"
        :description="product.attributes.description"
        :url="product.attributes.image.data.attributes.url"
        :price="product.attributes.price ?? 0"
        :discount="product.attributes.discount ?? 0"
        @click="productClick(product)"
      />
    </div>
  </div>
</template>
