// https://lms.metaclass.kts.studio/lesson/158/unit/

import React from "react";
import { ILocalStore } from "types/types.ts";
// сделаем функцию дженериком <T>, это значит что она принимает
// функцию creator, которая возвращает сущность типа T и сама
// функция useLocalStore возвращает сущность типа T
export const useLocalStore = <T extends ILocalStore>(creator: () => T): T => {
  // повторили логику создания из компонента
  const container = React.useRef<null | T>(null);
  if (container.current === null) {
    container.current = creator();
  }

  React.useEffect(() => {
    return () => container.current?.destroy();
  }, []);

  return container.current;
};
