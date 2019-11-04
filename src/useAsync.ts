import * as React from "react";

export type PromiseValue<T> = { loading: true } | { ok: T } | { err: unknown };

export default function useAsync<T>(fn: () => Promise<T>): PromiseValue<T> {
  const [value, setValue] = React.useState<PromiseValue<T>>({ loading: true });
  React.useEffect(() => {
    let cancelled = false;
    setValue({ loading: true });
    fn().then(
      ok => {
        if (!cancelled) {
          setValue({ ok });
        }
      },
      err => {
        if (!cancelled) {
          setValue({ err });
        }
      }
    );
    return () => {
      cancelled = true;
    };
  }, [fn]);
  return value;
}
