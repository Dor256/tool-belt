export async function asyncFilter<T>(array: T[], fn: (item: T, index: number) => Promise<boolean>) {
  const booleanArray = await Promise.all(array.map(fn));
  return array.filter((_, i) => booleanArray[i]);
}
