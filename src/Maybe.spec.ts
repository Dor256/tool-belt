import { Maybe } from './Maybe';

describe('Maybe monad', () => {
  describe('fromValue', () => {
    it('Creates a maybe from a value', () => {
      const value = 5;
  
      const maybeValue = Maybe.fromValue(value);
  
      expect(maybeValue instanceof Maybe).toBe(true);
    });
  
    it('Creates a maybe from an undefined or null value', () => {
      const undefinedValue = undefined;
  
      const maybeValue = Maybe.fromValue(undefinedValue);
  
      expect(maybeValue instanceof Maybe).toBe(true);
    });
  });

  describe('orElse', () => {
    it('Extracts the value from a defined maybe', () => {
      const value = 5;
  
      const maybeValue = Maybe.fromValue(value);
  
      expect(maybeValue.orElse(6)).toBe(value);
    });

    it('Falls back to default value from undefined maybe', () => {
      const undefinedValue = undefined;

      const maybeValue = Maybe.fromValue(undefinedValue);

      expect(maybeValue.orElse(6)).toBe(6);
    });
  });

  describe('inCaseOf', () => {
    it('Unwraps the maybe value to be Just', () => {
      const value = 5;
      const maybeValue = Maybe.fromValue(value);

      const unwrapped = maybeValue.inCaseOf({
        Just: (val) => val,
        Nothing: () => 6
      });

      expect(unwrapped).toBe(value);
    })

    it('Unwraps the maybe value to be Nothing', () => {
      const undefinedValue = undefined;
      const maybeValue = Maybe.fromValue(undefinedValue);

      const unwrapped = maybeValue.inCaseOf({
        Just: (val) => val,
        Nothing: () => 6
      });

      expect(unwrapped).toBe(6);
    });
  });

  describe('map', () => {
    it('Maps the maybe', () => {
      const value = 5;
      const maybeValue = Maybe.fromValue(value);

      const mapped = maybeValue.map((wrapped) => `${wrapped}`);

      expect(mapped.orElse('')).toBe('5');
    });

    it('Maps Nothing to Nothing', () => {
      const undefinedValue = undefined;
      const maybeValue = Maybe.fromValue<number>(undefinedValue);

      const mapped = maybeValue.map((wrapped) => `${wrapped}`);

      expect(mapped.orElse('Nothing')).toBe('Nothing');
    });
  });

  describe('flatMap', () => {
    it('Flatmaps a maybe', () => {
      const value = 5;
      const maybeValue = Maybe.fromValue(value);

      const flatMapped = maybeValue.flatMap((wrapped) => Maybe.fromValue(wrapped * 2));

      expect(flatMapped.orElse(6)).toBe(10);
    });
  });

  describe('compose', () => {
    it('Returns the composed value for Just', () => {
      const expected = Maybe.compose({
        first: Maybe.fromValue('first'),
        second: Maybe.fromValue('second')
      });

      expect(expected.orElse(6)).toEqual({
        first: 'first',
        second: 'second'
      })
    });

    it('Returns Nothing if one of the values is Nothing', () => {
      const expected = Maybe.compose({
        first: Maybe.fromValue('first'),
        second: Maybe.fromValue(),
        third: Maybe.fromValue('third')
      });

      expect(expected.orElse('nothing')).toBe('nothing');
    })
  });
});
