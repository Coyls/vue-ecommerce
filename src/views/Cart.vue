<template>
  <div class="cart">Cart : {{ storeCart.length }}</div>
  <ul v-if="items.length > 0" class="flex flex-col mx-auto">
    <li
      class="flex flex-row justify-evenly my-4"
      :class="[item.onCart ? 'border-blue-600 border-2' : '']"
      v-for="item in cart"
      :key="item.id"
    >
      <router-link
        :to="{
          name: 'Item',
          path: '/item/' + item.id,
          params: item,
        }"
      >
        <img class="h-64" :src="item.image" :alt="item.title" />
      </router-link>
      <p class="w-64">{{ item.title }}</p>
      <p>{{ item.price }} $</p>
      <button class="w-40" :id="item.id" @click="(e) => removeToCart(e)">
        remove to cart
      </button>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { IItem } from "../types";
import { useStore } from "vuex";
import { key, State } from "../store";
import { store } from "../store/index";

export default defineComponent({
  name: "Cart",
  data() {
    return {
      cart: [] as IItem[],
    };
  },
  setup() {
    const store = useStore(key);

    return {
      storeCart: store.state.cart,
    };
  },
  mounted() {
    this.setUpCart(this.storeCart);
  },

  methods: {
    // eslint-disable-next-line
    removeToCart: function (e: any) {
      store.commit("removeToBag", { items: this.cart, btn: e.target });
    },
    setUpCart: function (storeCart: State["cart"]) {
      this.cart = storeCart;
    },
  },
});
</script>
