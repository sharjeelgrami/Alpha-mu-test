import { ItemsStore } from "./store";

export interface TwoFactorAuthProps {
  itemsStore: ItemsStore;
}

export interface Item {
  name: string;
  code: string;
  id: string;
  timestamp: number;
}

export interface ItemsStoreProps {
  items: Item[];
  updateItems: (newItems: Item[]) => void;
}
