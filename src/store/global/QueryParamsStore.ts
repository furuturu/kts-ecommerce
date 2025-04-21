// https://lms.metaclass.kts.studio/lesson/165/unit/

import { action, computed, makeObservable, observable } from "mobx";
import qs from "qs";

type PrivateFields = "_parsedQueryParameters";

export class QueryParamsStore {
  /** Разобранные параметры запроса из строки URL */
  private _parsedQueryParameters: qs.ParsedQs = {};
  /** Исходная строка URL (это которая без знака "?") */
  private _initialURLQuery: string = "";

  constructor() {
    makeObservable<QueryParamsStore, PrivateFields>(this, {
      _parsedQueryParameters: observable.ref,
      parsedQueryParameters: computed,
      setURLQueryParameters: action,
      updateQueryParameters: action,
    });
  }

  /** Получение значения по ключу
   *
   * @param key - Имя параметра, который нужно получить
   * @returns Значение параметра (строка / массив / объект)
   */
  getParameterValue(
    key: string,
  ):
    | undefined
    | string
    | string[]
    | qs.ParsedQs
    | qs.ParsedQs[]
    | (string | qs.ParsedQs)[] {
    return this._parsedQueryParameters[key];
  }

  /** Обновляет данные на основе новой строки запроса URL */
  setURLQueryParameters(urlQuery: string) {
    const normalizedURLQuery = urlQuery.startsWith("?")
      ? urlQuery.slice(1)
      : urlQuery;

    if (this._initialURLQuery !== normalizedURLQuery) {
      this._initialURLQuery = normalizedURLQuery;
      this._parsedQueryParameters = qs.parse(normalizedURLQuery);
    }
  }

  updateQueryParameters(params: {
    page: number;
    search: string;
    category: string;
  }) {
    const queryParams: Record<string, string> = {};

    if (params.page > 1) {
      queryParams.page = String(params.page);
    }

    if (params.search) {
      queryParams.search = params.search;
    }

    if (params.category) {
      queryParams.category = params.category;
    }

    const queryParamsString = new URLSearchParams(queryParams).toString();
    const newUrl =
      window.location.pathname +
      (queryParamsString ? `?${queryParamsString}` : "");

    if (window.location.href !== newUrl) {
      window.history.pushState({}, "", newUrl);
    }

    this.setURLQueryParameters(queryParamsString);
  }

  get parsedQueryParameters() {
    return this._parsedQueryParameters;
  }
}
