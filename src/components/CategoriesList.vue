<script lang="ts">
import { useQuery } from "@vue/apollo-composable";
import gql from "graphql-tag";
import CategoryItem from "./CategoryItem.vue";
import { computed } from "vue";
import type { CategoryModel } from "@/models/Category.model";

export default {
  setup() {
    const { result } = useQuery(
      gql`
        {
          categories {
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
      `
    );

    const categories = computed<CategoryModel[]>(
      () => result.value?.categories?.data ?? []
    );

    return {
      categories,
    };
  },
  components: { CategoryItem },
  methods: {
    categoryClick(category: CategoryModel) {
      console.log(category);
      this.$router.push(`/categories/${category.id}`);
    },
  },
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
        @click="categoryClick(category)"
      />
    </div>
  </div>
</template>
