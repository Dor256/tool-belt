export declare function asyncFilter<T>(array: T[], fn: (item: T, index: number) => Promise<boolean>): Promise<T[]>;
