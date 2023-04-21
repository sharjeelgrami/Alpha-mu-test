import { ItemsStore } from "./store";

export interface TwoFactorAuthProps {
  itemsStore: ItemsStore;
}

export interface ItemTimes {
  [key: string]: number;
}

export interface Item {
  id: string;
  name: string;
  code: string;
  timestamp?: number;
}

export interface ItemsStoreProps {
  items: Item[];
  updateItems: (newItems: Item[]) => void;
}
