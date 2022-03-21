<template>
  <section class="item-section">
    <img class="h-96 mx-auto" :src="item.image" :alt="item.title" />
    <h1>{{ item.title }}</h1>
    <h2>{{ item.price }}</h2>
  </section>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { IItem } from "../types";
import axios from "axios";
export default defineComponent({
  name: "Item",
  data() {
    return {
      item: {} as IItem,
    };
  },
  mounted() {
    this.initializeItems();
  },
  methods: {
    initializeItems: function () {
      (async () => {
        try {
          const { data } = await axios.get(
            "https://fakestoreapi.com/products/" + this.$route.params.id
          );
          // eslint-disable-next-line
          this.item = {
            id: data.id,
            title: data.title,
            image: data.image,
            price: data.price,
            onCart: false,
          };
        } catch (err) {
          console.log(err);
        }
      })();
    },
  },
  /* props: {
    item : {
      type : Object,
      required : true
    }
  } ,
  setup(props) {
    console.log(props.item);
  }, */
});
</script>
<style lang="scss">
.item-section {
  @apply flex flex-col justify-evenly;
  height: 500px;
}
</style>
