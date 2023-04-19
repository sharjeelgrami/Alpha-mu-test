import { createContext, useContext } from "react";
import { makeObservable, observable, action } from "mobx";
import { Item } from "./2FactorAuthProps";

export class ItemsStore {
  items: Item[] = []; // explicitly typed as an array of Item objects

  constructor() {
    makeObservable(this, {
      items: observable,
      addItem: action,
    });
  }

  addItem(item: Item) {
    this.items.push(item);
  }

  resetCode(item: Item) {
    const index = this.items.findIndex((i) => i === item);
    if (index >= 0) {
      this.items[index].code = Math.floor(
        Math.random() * 900000 + 100000
      ).toString();
    }
  }

  updateItems(newItems: Item[]) {
    this.items = newItems;
  }
}

export const useItemsStore = () => {
  const itemsStore = new ItemsStore();
  return itemsStore;
};

export const ItemsStoreContext = createContext(new ItemsStore());

export const useItems = () => {
  const itemsStore = useContext(ItemsStoreContext);
  return itemsStore.items;
};

export {};
