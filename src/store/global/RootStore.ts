import { QueryParamsStore } from "./QueryParamsStore.ts";
import { ApiStore } from "./ApiStore.ts";

export class RootStore {
  readonly query = new QueryParamsStore();
  readonly api = new ApiStore();
}

export const rootStore = new RootStore();
