import { RootStore } from "../store/global/RootStore.ts";
import { createContext } from "react";

export const RootStoreContext = createContext<RootStore | null>(null);
