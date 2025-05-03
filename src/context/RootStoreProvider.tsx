import React, { PropsWithChildren, useRef } from "react";
import { RootStore } from "../store/global/RootStore.ts";
import { RootStoreContext } from "./RootStoreContext.ts";

export const RootStoreProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const rootStoreRef = useRef<RootStore>(new RootStore());
  return (
    <RootStoreContext.Provider value={rootStoreRef.current}>
      {children}
    </RootStoreContext.Provider>
  );
};
