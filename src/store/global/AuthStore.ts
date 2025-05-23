import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from "mobx";
import { strapiAuth } from "services/axios.ts";
import { isApiErrorResponse } from "../../utils/isApiError.ts";

interface User {
  id: number;
  username: string;
  email: string;
}

type PrivateFields = "_user" | "_loading" | "_error";

class AuthStore {
  private _user: User | null = null;
  private _loading: boolean = false;
  private _error: string | null = null;
  constructor() {
    makeObservable<AuthStore, PrivateFields>(this, {
      _user: observable,
      _loading: observable,
      _error: observable,

      user: computed,
      loading: computed,
      error: computed,

      register: action,
      login: action,
      logout: action,
      fetchUserData: action,
      initializeAuth: action,
    });
    this._setupAxiosInterceptors();
    this.initializeAuth();
  }

  private _setupAxiosInterceptors = () => {
    strapiAuth.interceptors.request.use((config) => {
      const jwt = localStorage.getItem("jwt");
      if (jwt) {
        config.headers.Authorization = `Bearer ${jwt}`;
      }
      return config;
    });
  };

  get user() {
    return this._user;
  }

  get loading() {
    return this._loading;
  }

  get error() {
    return this._error;
  }

  initializeAuth = () => {
    const jwt = localStorage.getItem("jwt");
    if (jwt && !this._user) {
      this.fetchUserData();
    }
  };

  fetchUserData = async () => {
    this._loading = true;
    try {
      const response = await strapiAuth.get("/users/me");
      runInAction(() => {
        this._user = response.data;
        this._loading = false;
      });
    } catch (error) {
      runInAction(() => {
        this._error = String(error);
        this._loading = false;
      });
    }
  };

  register = async (username: string, email: string, password: string) => {
    this._loading = true;
    this._error = null;

    try {
      const { data } = await strapiAuth.post("/auth/local/register", {
        username,
        email,
        password,
      });
      runInAction(() => {
        localStorage.setItem("jwt", data.jwt);
        this._user = data.user;
        this._loading = false;
      });
    } catch (error) {
      runInAction(() => {
        if (isApiErrorResponse(error)) {
          this._error =
            error.response.data.error.message || "Ошибка при регистрации";
        } else {
          console.error("Что-то сломалось:", error);
          this._error = "Что-то пошло не так";
        }
        this._loading = false;
      });
    }
  };

  login = async (identifier: string, password: string) => {
    this._loading = true;
    this._error = null;
    try {
      const { data } = await strapiAuth.post("/auth/local", {
        identifier,
        password,
      });
      runInAction(() => {
        localStorage.setItem("jwt", data.jwt);
        this._user = data.user;
        this._loading = false;
      });
    } catch (error) {
      runInAction(() => {
        if (isApiErrorResponse(error)) {
          this._error =
            error.response.data.error.message || "Ошибка при регистрации";
        } else {
          console.error("Что-то сломалось:", error);
          this._error = "Что-то пошло не так";
        }
        this._loading = false;
      });
    }
  };

  logout = async () => {
    localStorage.removeItem("jwt");
    this._user = null;
  };
}

export const authStore = new AuthStore();
