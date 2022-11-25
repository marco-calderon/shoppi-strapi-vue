<script lang="ts">
import type { CategoryModel } from "@/models/Category.model";
import gql from "graphql-tag";
import CategoryItem from "./CategoryItem.vue";

export default {
  data() {
    return {
      categories: [] as CategoryModel[],
    };
  },
  apollo: {
    categories: {
      query: gql`
        {
          categories {
            data {
              id
              attributes {
                name
                cover {
                  data {
                    id
                    attributes {
                      url
                    }
                  }
                }
                products {
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
      update: (data) => data.categories.data,
    },
  },
  components: { CategoryItem },
};
</script>

<template>
  <div class="flex flex-col gap-6">
    <h3 class="text-2xl font-bold">Categories</h3>

    <div class="grid gap-8 lg:grid-cols-4 md:grid-cols-4 sm:grid-cols-2">
      <CategoryItem
        v-for="category in categories"
        :key="category.id"
        :name="category.attributes.name"
        :description="category.attributes.description"
        :url="category.attributes.cover.data.attributes.url"
      />
    </div>
  </div>
</template>
