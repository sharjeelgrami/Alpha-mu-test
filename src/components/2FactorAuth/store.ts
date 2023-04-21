import { createContext, useContext } from "react";
import { makeObservable, observable, action, ObservableMap } from "mobx";
import { generateCode } from "components/addNewItem";
import { Item } from "./2FactorAuthProps";

export class ItemsStore {
  items: Item[] = []; // explicitly typed as an array of Item objects
  itemTimes = observable.map<string, number>({});

  constructor() {
    makeObservable(this, {
      items: observable,
      itemTimes: observable,
      addItem: action,
      resetCode: action,
      resetCodeAndTimer: action,
      updateItems: action,
    });

    // Set up a timer to update the remaining time for each item every second
    setInterval(() => {
      const newTimes: { [key: string]: number } = {};
      this.itemTimes.forEach((time, id) => {
        const newTime = time - 1;
        if (newTime >= 0) {
          newTimes[id] = newTime;
        } else {
          // Reset the code and timer for the expired item
          const item = this.items.find((i) => i.id === id);
          if (item) {
            this.resetCodeAndTimer(item);
          }
        }
      });
      this.setItemTimes(newTimes);
    }, 1000);
  }

  addItem(item: Item) {
    this.items.push({ ...item, timestamp: Date.now() });
    this.itemTimes.set(item.id, 60); // Set the initial remaining time to 60 seconds
  }

  setItemTimes(newItemTimes: { [key: string]: number }) {
    const plainObj = Object.assign({}, newItemTimes);
    this.itemTimes.replace(plainObj);
  }

  resetCode(item: Item) {
    const index = this.items.findIndex((i) => i === item);
    if (index >= 0) {
      this.items[index].code = Math.floor(
        Math.random() * 900000 + 100000
      ).toString();
    }
  }

  resetCodeAndTimer(item: Item) {
    // reset the code
    item.code = generateCode();
    // reset the timer
    const newItemTimes = new ObservableMap<string, number>();
    newItemTimes.set(item.id, 60);
    this.itemTimes.replace(newItemTimes);
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
