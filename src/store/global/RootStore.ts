import QueryParamsStore from "./QueryParamsStore.ts";
import { makeObservable } from "mobx";

export class RootStore {
  readonly query = new QueryParamsStore();

  constructor() {
    makeObservable(this);
  }

  init() {
    if (typeof window !== "undefined") {
      this.query.setSearch(window.location.search);
    }
  }
}

export const rootStore = new RootStore();
rootStore.init();
