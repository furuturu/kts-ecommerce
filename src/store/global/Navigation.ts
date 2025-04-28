import { NavigateFunction, NavigateOptions } from "react-router";

export class Navigation {
  private _navigate: NavigateFunction | null = null;

  setNavigate(navigate: NavigateFunction) {
    this._navigate = navigate;
  }

  navigateTo(path: string, options?: NavigateOptions) {
    if (this._navigate) {
      this._navigate(path, options);
    } else {
      console.error("Все сломалось");
    }
  }
}
