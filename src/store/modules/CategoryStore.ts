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

export class CategoryStore implements ILocalStore {
  categories: ProductCategory[] = [];
  images: string[] = [];
  loading: boolean = false;
  error: string | null = null;
  private _rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this._rootStore = rootStore;
    makeObservable(this, {
      categories: observable.ref,
      images: observable,
      loading: observable,
      error: observable,
      getCategories: action,
      categoryOptions: computed,
      destroy: action,
    });
  }

  getCategories = async () => {
    this.loading = true;
    try {
      const categoriesData: ProductCategoryResponse =
        await this._rootStore.api.fetchProductCategories();
      runInAction(() => {
        if (categoriesData) {
          this.categories = categoriesData.data;
        }
      });
    } catch (error) {
      this.error = String(error);
    } finally {
      this.loading = false;
    }
  };

  get categoryOptions() {
    return [
      { key: "", value: "Все категории" },
      ...this.categories.map((category) => ({
        key: category.id,
        value: category.title,
      })),
    ];
  }

  destroy = () => {
    this.categories = [];
    this.images = [];
    this.error = null;
    this.loading = false;
  };
}

export const createCategoriesStore = () => new CategoryStore(rootStore);
