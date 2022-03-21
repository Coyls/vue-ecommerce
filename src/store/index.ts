import { InjectionKey } from "vue";
import { createStore, Store, useStore as baseUseStore } from "vuex";
import { IItem } from "../types";

export const key: InjectionKey<Store<State>> = Symbol();
export interface State {
  cart: IItem[];
}

// interface ComponentCustomProperties {
//   $store: Store<State>;
// }

// eslint-disable-next-line
export function useStore(): any {
  return baseUseStore(key);
}

export const store = createStore<State>({
  getters: {
    //
  },
  state: {
    cart: [] as unknown as IItem[],
  },
  mutations: {
    // eslint-disable-next-line
    addToBag(state: State, { items, btn }: { items: IItem[]; btn: any }) {
      console.log("ADD ITEM");
      const toAdd = items.find((item: IItem) => item.id === parseInt(btn.id));

      if (toAdd !== undefined && !toAdd.onCart) {
        toAdd.onCart = true;
        state.cart.push(toAdd as IItem);
      }
    },
    // eslint-disable-next-line
    removeToBag(state: State, { items, btn }: { items: IItem[]; btn: any }) {
      const toRemove = items.find(
        (item: IItem) => item.id === parseInt(btn.id)
      );

      if (toRemove !== undefined && toRemove.onCart) {
        toRemove.onCart = false;
        state.cart = state.cart.filter((item) => item.id !== toRemove.id);
      }
    },
  },
  /* actions: {
    loadProducts() {
      //
    },
    loadBag() {
      //
    },
    removeFromBag() {
      //
    },
    addToBag() {
      //
    },
  }, */
  modules: {},
});
