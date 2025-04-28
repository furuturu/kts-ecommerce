import { QueryParamsStore } from "./QueryParamsStore.ts";
import { ApiStore } from "./ApiStore.ts";
import { CartStore } from "./CartStore.ts";
import { Navigation } from "./Navigation.ts";

export class RootStore {
  readonly query = new QueryParamsStore(this);
  readonly api = new ApiStore();
  readonly cart = new CartStore();
  readonly navigation = new Navigation();
}

export const rootStore = new RootStore();
