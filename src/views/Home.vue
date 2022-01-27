<template>
  <div class="home">
    <ul v-if="items.length > 0">
      <li v-for="item in items" :key="item.id">
        <p>{{ item.title }} | {{ item.price }}</p>
        <img :src="item.image" :alt="item.title" />
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
    (async () => {
      try {
        this.items = await axios.get("https://fakestoreapi.com/products");
      } catch (err) {
        console.log(err);
      }
    })();
  },
});
</script>
