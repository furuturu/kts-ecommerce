// https://lms.metaclass.kts.studio/lesson/165/unit/

import { action, computed, makeObservable, observable } from "mobx";
import qs from "qs";
import { RootStore } from "./RootStore.ts";

type PrivateFields = "_parsedQueryParameters" | "_previousQueryParams";

export class QueryParamsStore {
  /** Разобранные параметры запроса из строки URL */
  private _parsedQueryParameters: qs.ParsedQs = {};
  /** Исходная строка URL (это которая без знака "?") */
  private _initialURLQuery: string = "";
  private _rootStore: RootStore;
  /** Параметры запроса для возвращения по кнопке назад */
  private _previousQueryParams: {
    page?: number;
    search?: string;
    category?: string;
    target?: string;
  } = {};

  constructor(rootStore: RootStore) {
    this._rootStore = rootStore;
    makeObservable<QueryParamsStore, PrivateFields>(this, {
      _parsedQueryParameters: observable.ref,
      _previousQueryParams: observable,

      parsedQueryParameters: computed,
      setURLQueryParameters: action,
      savePreviousQueryParams: action,
      navigateBack: action,
    });
  }

  /** Получение значения по ключу
   *
   * @param key - Имя параметра, который нужно получить
   * @returns Значение параметра (строка / массив / объект)
   */
  getParsedParameterValue(
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

  /** Геттеры */
  get parsedQueryParameters() {
    return this._parsedQueryParameters;
  }

  /** Обновляет данные на основе новой строки запроса URL автоматически
   * через хук initQueryParamsStore при монтировании компонента */
  setURLQueryParameters(urlQuery: string) {
    const normalizedURLQuery = urlQuery.startsWith("?")
      ? urlQuery.slice(1)
      : urlQuery;

    if (this._initialURLQuery !== normalizedURLQuery) {
      this._initialURLQuery = normalizedURLQuery;
      this._parsedQueryParameters = qs.parse(normalizedURLQuery);
    }
  }

  /** Для обновления URL из других сторов */
  updateQueryParameters(params: {
    page?: number;
    search?: string;
    category?: string;
  }) {
    const queryParams: Record<string, string> = {};

    if (params.page && params.page > 1) {
      queryParams.page = String(params.page);
    }

    if (params.search) {
      queryParams.search = params.search;
    }

    if (params.category) {
      queryParams.category = params.category;
    }

    const queryParamsString = qs.stringify(queryParams);

    this._rootStore.navigation.navigateTo(`?${queryParamsString}`);
  }

  savePreviousQueryParams() {
    this._previousQueryParams = {
      page: this._parsedQueryParameters.page
        ? Number(this._parsedQueryParameters.page)
        : undefined,
      search: this._parsedQueryParameters.search as string | undefined,
      category: this._parsedQueryParameters.category as string | undefined,
    };
  }

  navigateBack() {
    const queryParams: Record<string, string> = {};

    if (this._previousQueryParams.page && this._previousQueryParams.page > 1) {
      queryParams.page = String(this._previousQueryParams.page);
    }

    if (this._previousQueryParams.search) {
      queryParams.search = this._previousQueryParams.search;
    }

    if (this._previousQueryParams.category) {
      queryParams.category = this._previousQueryParams.category;
    }

    const queryParamsString = qs.stringify(queryParams);
    const path = `/${queryParamsString ? `?${queryParamsString}` : ""}`;

    this._rootStore.navigation.navigateTo(path);
  }
}
