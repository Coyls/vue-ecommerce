<template>
  <div class="home">
    <div>Cart : {{ storeCart.length }}</div>
    <ul v-if="items.length > 0" class="flex flex-col mx-auto">
      <li
        class="flex flex-row justify-evenly my-4"
        :class="[item.onCart ? 'border-blue-600 border-2' : '']"
        v-for="item in items"
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
        <button
          class="w-40"
          v-if="!item.onCart"
          :id="item.id"
          @click="(e) => addToCart(e)"
        >
          add to cart
        </button>
        <button
          class="w-40"
          v-else
          :id="item.id"
          @click="(e) => removeToCart(e)"
        >
          remove to cart
        </button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";
// import { mapState } from "vuex";
import { IItem } from "../types";
import { useStore } from "vuex";
import { key, State } from "../store";
import { store } from "../store/index";

export default defineComponent({
  name: "Home",
  data() {
    return {
      items: [] as IItem[],
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
    this.initializeItems();
    this.setUpCart(this.storeCart);
  },
  // computed: mapState({
  //   items: (state) => state.items,
  // }),
  methods: {
    // eslint-disable-next-line
    addToCart: function (e: any) {
      store.commit("addToBag", { items: this.items, btn: e.target });
    },
    // eslint-disable-next-line
    removeToCart: function (e: any) {
      store.commit("removeToBag", { items: this.items, btn: e.target });
    },
    setUpCart: function (storeCart: State["cart"]) {
      this.cart = storeCart;
    },
    initializeItems: async function () {
      try {
        const { data } = await axios.get("https://fakestoreapi.com/products");
        // eslint-disable-next-line
        this.items = data.map((frag: any) => {
          return {
            id: frag.id,
            title: frag.title,
            image: frag.image,
            price: frag.price,
            onCart: false,
          };
        });
      } catch (err) {
        console.log(err);
      }
    },
  },
});
</script>

<style lang="scss"></style>
