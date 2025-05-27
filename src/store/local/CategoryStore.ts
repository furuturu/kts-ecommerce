import {
  ILocalStore,
  ProductCategory,
  ProductCategoryResponse,
} from "types/types.ts";
import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from "mobx";
import { RootStore } from "../global/RootStore.ts";
import { ApiError } from "../../types/error.ts";
import { handleError } from "../../utils/handleError.ts";

type PrivateFields = "_categories" | "_images" | "_loading" | "_error";

export class CategoryStore implements ILocalStore {
  private _categories: ProductCategory[] = [];
  private _images: string[] = [];
  private _loading: boolean = false;
  private _error: ApiError | null = null;
  private _rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this._rootStore = rootStore;
    makeObservable<CategoryStore, PrivateFields>(this, {
      _categories: observable.ref,
      _images: observable,
      _loading: observable,
      _error: observable,
      categories: computed,
      images: computed,
      loading: computed,
      error: computed,
      getCategories: action,
      categoryOptions: computed,
      destroy: action,
    });
  }

  get categories(): ProductCategory[] {
    return this._categories;
  }

  get images(): string[] {
    return this._images;
  }

  get loading(): boolean {
    return this._loading;
  }

  get error(): string | undefined {
    return this._error?.message;
  }

  getCategories = async () => {
    this._loading = true;
    try {
      const categoriesData: ProductCategoryResponse =
        await this._rootStore.api.fetchProductCategories();
      runInAction(() => {
        if (categoriesData) {
          this._categories = categoriesData.data;
        }
      });
    } catch (error) {
      runInAction(() => {
        this._error = handleError(error);
      });
    } finally {
      runInAction(() => {
        this._loading = false;
      });
    }
  };

  get categoryOptions() {
    return [
      { key: "", value: "Все категории" },
      ...this._categories.map((category) => ({
        key: category.id,
        value: category.title,
      })),
    ];
  }

  destroy = () => {
    this._categories = [];
    this._images = [];
    this._error = null;
    this._loading = false;
  };
}

export const createCategoriesStore = (rootStore: RootStore) =>
  new CategoryStore(rootStore);
