export declare class Maybe<T> {
    #private;
    private constructor();
    static Just<T>(value: T): Maybe<T>;
    static Nothing<T>(): Maybe<T>;
    static fromValue<T>(value?: T | null | undefined): Maybe<T>;
    inCaseOf<R = T>(options: {
        Just: (value: T) => R;
        Nothing: () => R;
    }): R;
    orElse<R = T>(fallback: R): R | NonNullable<T>;
    map<R>(f: (wrapped: T) => R): Maybe<R>;
    flatMap<R>(f: (wrapped: T) => Maybe<R>): Maybe<R>;
}
