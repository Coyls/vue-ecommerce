<template>
  <div class="home">
    <ul v-if="items.length > 0">
      <li v-for="item in items" :key="item.id">
        <p>{{ item.title }} | {{ item.price }}</p>
        <img src="" alt="" />
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";

export default defineComponent({
  name: "Home",
  data() {
    return {
      items: [],
    };
  },
  mounted() {
    console.log("heloo");
    (async () => {
      console.log("HelloWorl");
      const { data } = await axios.get("https://fakestoreapi.com/products");
      this.items = data;
    })();
  },
});
</script>
