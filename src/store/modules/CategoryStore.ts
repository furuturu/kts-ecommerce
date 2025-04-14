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
import { rootStore, RootStore } from "../global/RootStore.ts";

type PrivateFields = "_categories" | "_images" | "_loading" | "_error";

export class CategoryStore implements ILocalStore {
  private _categories: ProductCategory[] = [];
  private _images: string[] = [];
  private _loading: boolean = false;
  private _error: string | null = null;
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

  get error(): string | null {
    return this._error;
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
      this._error = String(error);
    } finally {
      this._loading = false;
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

export const createCategoriesStore = () => new CategoryStore(rootStore);
