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
  itemRemainingTime?: number;
  intervalId?: ReturnType<typeof setInterval> | null;
}

export interface ItemsStoreProps {
  items: Item[];
  updateItems: (newItems: Item[]) => void;
}
