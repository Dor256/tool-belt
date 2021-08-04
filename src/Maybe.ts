export class Maybe<T> {
  #value;

  private constructor(value: Nullable<T>) {
    this.#value = value;
  }

  static Just<T>(value: T) {
    return new Maybe<T>(value);
  }

  static Nothing<T>() {
    return new Maybe<T>(null);
  }

  static fromValue<T>(value?: T | null | undefined) {
    if (value === null || value === undefined) {
      return Maybe.Nothing<T>();
    }
    return Maybe.Just(value);
  }

  inCaseOf<R = T>(options: { Just: (value: T) => R, Nothing: () => R }): R {
    if (this.#value === undefined || this.#value === null) {
      return options.Nothing();
    }
    return options.Just(this.#value);
  }

  orElse<R = T>(fallback: R) {
    return this.#value ?? fallback;
  }

  map<R>(f: (wrapped: T) => R): Maybe<R> {
    if (this.#value === null || this.#value === undefined) {
      return Maybe.Nothing<R>();
    }
    return Maybe.fromValue(f(this.#value));
  }

  flatMap<R>(f: (wrapped: T) => Maybe<R>): Maybe<R> {
    if (this.#value === null || this.#value === undefined) {
      return Maybe.Nothing<R>();
    }
    return f(this.#value);
  }

  static compose<G>(maybes: Record<keyof G, Maybe<unknown>>): Maybe<G> {
    return Object.entries<Maybe<unknown>>(maybes).reduce((maybeAcc, [key, maybeValue]) => {
      return maybeValue.inCaseOf({
        Nothing: () => Maybe.fromValue<G>(),
        Just: (value) => {
          return maybeAcc.inCaseOf({
            Nothing: () => Maybe.fromValue(),
            Just: (acc) => Maybe.fromValue<G>({...acc, [key]: value})
          });
        }
      });
    }, Maybe.fromValue<G>({} as G));
  }
}
