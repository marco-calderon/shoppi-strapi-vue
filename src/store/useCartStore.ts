import type { ProductModel } from "@/models/Product.model";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useCartStore = defineStore("cart", () => {
  const items = ref<ProductModel[]>([]);

  function addToCart(product: ProductModel) {
    items.value.push(product);
  }

  function removeFromCart(id: number) {
    items.value.splice(
      items.value.findIndex((i) => i.id === id),
      1
    );
  }

  function clearCart() {
    items.value = [];
  }

  return { items, addToCart, removeFromCart, clearCart };
});
