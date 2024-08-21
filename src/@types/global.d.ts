export global {
  export type PropsOf<T> = {
    [K in keyof T as T[K] extends Function ? never : K]: T[K];
  };

  export type PartialOf<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>> &
    Partial<Pick<T, K>>;

  export type DeepPartial<T> = T extends object
    ? T extends Date
      ? T
      : { [P in keyof T]?: DeepPartial<T[P]> }
    : T;

  export type AtLeastOne<T, K extends keyof T = keyof T> = K extends keyof T
    ? { [P in K]-?: T[P] } & Partial<T>
    : never;

  export type ArrayOrSingle<T> = T | T[];

  export type Arrayify<T> = {
    [K in keyof T]: ArrayOrSingle<T[K]>;
  };

  export type Nullable<T> = T | null;
}
