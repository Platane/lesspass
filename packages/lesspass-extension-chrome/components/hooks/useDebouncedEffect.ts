import { useEffect, EffectCallback, DependencyList } from "react";

export const useDebouncedEffect = (
  effect: EffectCallback,
  deps: DependencyList,
  delay = 0
) => {
  useEffect(() => {
    let dispose;
    let timeout = setTimeout(() => {
      dispose = effect();
    }, delay);

    return () => {
      clearTimeout(timeout);
      if (dispose) dispose();
    };
  }, deps);
};
