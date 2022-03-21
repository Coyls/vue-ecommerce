import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

import Cart from "../views/Cart.vue";
import Home from "../views/Home.vue";
import Item from "../views/Item.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/item/:id",
    name: "Item",
    component: Item,
  },
  {
    path: "/cart",
    name: "Cart",
    component: Cart,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
