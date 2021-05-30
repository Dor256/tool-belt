import { asyncFilter } from './asyncFilter';

describe('asyncFilter', () => {
  it('Filters out odd numbers with async predicate', async () => {
    const array = [1, 2, 3, 4];

    const onlyEvens = await asyncFilter(array, async (item) => await Promise.resolve(item % 2 == 0));

    expect(onlyEvens).toEqual([2, 4]);
  });
});
