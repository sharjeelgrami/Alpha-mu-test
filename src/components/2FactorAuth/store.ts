import { createContext, useContext } from "react";
import { makeObservable, observable, action, ObservableMap, toJS } from "mobx";
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
    this.items.push({ ...item, timestamp: Date.now(), itemRemainingTime: 60 }); // Add the `itemRemainingTime` property and set it to 60 seconds
    setInterval(() => {
      const index = this.items.findIndex((i) => i.id === item.id);
      if (index >= 0) {
        const remainingTime = this.items[index].itemRemainingTime;
        if (remainingTime && remainingTime > 0) {
          this.items[index].itemRemainingTime = remainingTime - 1;
        }
      }
    }, 1000);
  }

  setItemTimes(newTimes: { [key: string]: number }) {
    const plainObject = toJS(this.itemTimes);
    const newObject = observable.map<string, number>(plainObject);
    Object.keys(newTimes).forEach((key) => {
      newObject.set(key, newTimes[key]);
    });
    this.itemTimes.replace(newObject);
  }

  resetCode(item: Item) {
    const index = this.items.findIndex((i) => i === item);
    if (index >= 0) {
      this.items[index].code = Math.floor(
        Math.random() * 900000 + 100000
      ).toString();
    }
  }

  resetCodeAndTimer = (item: Item) => {
    console.log("resetCodeAndTimer called for item:", item);
    // reset the code
    item.code = generateCode();
    console.log("New code generated for item:", item);

    // reset the timer
    const newItemTimes = new ObservableMap<string, number>();
    newItemTimes.set(item.id, 60);
    this.itemTimes.replace(newItemTimes);
    console.log("Item time reset for item:", item);
  };

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
