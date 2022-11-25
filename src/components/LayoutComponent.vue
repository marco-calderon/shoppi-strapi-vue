<script lang="ts">
import NavbarComponent from "./NavbarComponent.vue";
export default { components: { NavbarComponent } };
</script>

<template>
  <div class="flex flex-col w-full bg-gray-200 dark:bg-gray-900">
    <NavbarComponent />
    <div class="mt-12">
      <slot />
    </div>
  </div>
</template>
