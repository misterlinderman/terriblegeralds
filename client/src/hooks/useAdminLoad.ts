import { useEffect } from 'react';

/** Run admin list fetch on mount or when `deps` change. Omits unstable `load` from deps by design. */
export function useAdminLoad(load: () => void | Promise<void>, deps: unknown[] = []) {
  useEffect(() => {
    void load();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- admin fetch; load is recreated each render
  }, deps);
}
