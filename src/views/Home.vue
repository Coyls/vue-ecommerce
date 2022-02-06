<template>
  <div class="home">
    <ul v-if="items.length > 0" class="flex flex-col mx-auto">
      <li
        class="flex flex-row justify-evenly my-4"
        v-for="item in items"
        :key="item.id"
      >
        <img class="h-64" :src="item.image" :alt="item.title" />
        <p class="w-64">{{ item.title }}</p>
        <p>{{ item.price }} $</p>
        <button v-if="!item.onCart" :id="item.id" @click="(e) => addToCart(e)">
          add to cart
        </button>
        <button v-else :id="item.id" @click="(e) => removeToCart(e)">
          remove to cart
        </button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";

interface Items {
  id: number;
  title: string;
  image: string;
  price: string;
  onCart: boolean;
}

export default defineComponent({
  name: "Home",
  data() {
    return {
      items: [] as Items[],
      cart: [] as Items[],
    };
  },
  mounted() {
    this.initializeItems();
  },
  methods: {
    // eslint-disable-next-line
    addToCart: function (e: any) {
      const btn = e.target;
      const toAdd = this.items.find((item) => item.id === parseInt(btn.id));

      if (toAdd !== undefined) {
        toAdd.onCart = true;
        this.cart.push(toAdd as Items);
      }

      console.log(this.items);
    },
    // eslint-disable-next-line
    removeToCart: function (e: any) {
      const btn = e.target;
      const toRemove = this.items.find((item) => item.id === parseInt(btn.id));

      if (toRemove !== undefined) {
        toRemove.onCart = false;
        this.cart = this.cart.filter((item) => item.id !== toRemove.id);
      }
    },
    initializeItems: function () {
      (async () => {
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
      })();
    },
  },
});
</script>

<style lang="scss"></style>
