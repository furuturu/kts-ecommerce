// https://lms.metaclass.kts.studio/lesson/165/unit/309

import { action, computed, makeObservable, observable } from "mobx";
import * as qs from "qs";

type PrivateFields = "_params";

export default class QueryParamsStore {
  private _params: qs.ParsedQs = {};
  private _search: string = "";

  constructor() {
    makeObservable<QueryParamsStore, PrivateFields>(this, {
      _params: observable.ref,
      params: computed,
      setSearch: action,
    });
  }

  get params() {
    return this._params;
  }

  getParam(
    key: string,
  ): undefined | string | string[] | qs.ParsedQs | qs.ParsedQs[] {
    return String(this._params[key]);
  }

  setParam(key: string, value: string) {
    this._params = { ...this._params, [key]: value };
  }

  setSearch(search: string) {
    search = search.startsWith("?") ? search.slice(1) : search;

    if (this._search !== search) {
      this._search = search;
      this._params = qs.parse(search);
    }
  }
}
