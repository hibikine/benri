import {
  convertToValue,
  convertToRawToken,
  isTimeValue,
  sequence,
  splitByColon,
  splitBySpaces,
  tokenizer,
  unificate,
  convertToToken,
  checkValid,
} from './calcDateRangeValue';

test.each([[[(v: number) => [v, v], (v: number) => [v * 2]], [4], [8, 8]]])(
  'sequence',
  (monads: ((v: any) => any[])[], value: any[], expectValue: any[]) => {
    expect(value.flatMap(sequence(monads))).toEqual(expectValue);
  }
);

test('splitBySpaces', () => {
  expect(splitBySpaces('1 10 100 hrs')).toEqual(['1', '10', '100', 'hrs']);
});

test('splitByColon', () => {
  expect(splitByColon('1:10：100')).toEqual(['1', ':', '10', ':', '100']);
});

test.each([
  [2, 1],
  [3, 1],
  [4, 4],
])('unificate', (arg: number, expectValue: number) => {
  expect(unificate([1, 2, 3])(arg)).toEqual([expectValue]);
});

test.each([
  [3, true],
  [12.5, true],
  ['hoge', false],
])('isTimeValue(%s)', (arg, expectValue) => {
  expect(isTimeValue(arg)).toBe(expectValue);
});
test.each([
  [3, true],
  [NaN, false],
  ['hoge', false],
  ['hours', true],
  ['+', true],
  [':', true],
])('checkValid(%s, %b)', (arg, expectValue) => {
  expect(checkValid(arg)).toBe(expectValue);
});

test.each([
  [2, 2],
  ['hoge', null],
  ['hours', 'hours'],
  [':', ':'],
])('convertToTokens', (arg, expectValue) => {
  expect(convertToToken(arg)).toBe(expectValue);
});

test.each([
  ['5', 5],
  ['.35', 0.35],
  ['hoge', NaN],
])('convertToValue(%s)', (arg, expectValue) => {
  expect(convertToValue(arg)).toBe(expectValue);
});
test.each([
  ['2', 2],
  ['hoge', NaN],
  ['+', '+'],
  [':', ':'],
])('convertToRawToken', (arg, expectValue) => {
  expect(convertToRawToken(arg)).toBe(expectValue);
});

test.each([
  ['1:30 - 12:40', [1, ':', 30, '-', 12, ':', 40]],
  ['14：40', [14, ':', 40]],
  ['hoge', []],
])('tokenize', (arg, expectValue) => {
  expect(tokenizer(arg)).toEqual(expectValue);
});
