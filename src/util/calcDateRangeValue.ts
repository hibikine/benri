type TimeValue = number;
type TimeUnit = 'hours' | 'minutes' | 'seconds' | 'days' | 'months' | 'years';
const TIMEUNITS = [
  'hours',
  'minutes',
  'seconds',
  'days',
  'months',
  'years',
] as const;
type Operator = '+' | '-' | '*' | '/' | ':';
const OPERATORS = ['+', '-', '*', '/', ':'] as const;
type RoundR = '(';
type RoundL = ')';
const ROUNDS = ['(', ')'] as const;
type Rounds = RoundR | RoundL;
type Token = TimeValue | TimeUnit | Operator | Rounds;
const SPACES = [' ', '　'] as const;
const COLONS = [':', '：'] as const;
const TOKENS = [...OPERATORS, ...ROUNDS, COLONS[0]] as const;
export const tokenizer = (s: string): Token[] => {
  // WIP
  return [s]
    .flatMap(splitBySpaces)
    .flatMap(splitByColon)
    .flatMap(splitByToken)
    .flatMap(removeEmpty)
    .map(convertToRawToken)
    .map(convertToToken)
    .map(v => [v])
    .flatMap(validOrError)
    .flat();
};
const splitBy = (separator: string) => (s: string) => s.split(separator);
const splitAndInsert = (separator: string) => (s: string) =>
  splitBy(separator)(s).flatMap((s, i, array) =>
    array.length - 1 === i ? [s] : [s, separator]
  );
export const sequence = <T extends {}>(
  list: ArrayMonad<T>[]
): ArrayMonad<T> => (v: T) => list.reduce((s, f) => s.flatMap(f), [v]);
const splitByToken = sequence(
  [...OPERATORS, ...ROUNDS].flatMap(splitAndInsert)
);
const removeEmpty = (v: string): [] | [string] => (v === '' ? [] : [v]);
type ArrayMonad<T> = (v: T) => T[];
export const unificate = <T extends {}>(v: readonly T[]) => (s: T) =>
  v.some(v => v === s) ? [v[0]] : [s];
export const splitByColon = sequence(
  COLONS.flatMap(splitAndInsert).concat([unificate(COLONS)])
);
type RawToken = string | number | null;
export const splitBySpaces = sequence(SPACES.flatMap(splitBy));
export const isTimeValue = (v: RawToken): v is TimeValue =>
  v !== null && !isNaN(+v);
export const isTimeUnit = (v: RawToken): v is TimeUnit =>
  (TIMEUNITS as readonly RawToken[]).includes(v);
const isOperator = (v: RawToken): v is Operator =>
  (OPERATORS as readonly RawToken[]).includes(v);
const isRound = (v: RawToken): v is Rounds =>
  (ROUNDS as readonly RawToken[]).includes(v);
const validOrError = (v: (Token | null)[]): [Token[]] =>
  v.some((v): v is Token => v !== null) ? [v as Token[]] : [[]];
export const checkValid = (v: RawToken): v is Token => {
  return [isTimeValue, isTimeUnit, isOperator, isRound].some(f => f(v));
};
export const convertToToken = (v: RawToken): Token | null =>
  checkValid(v) ? v : null;
export const convertToValue = (v: string): number => +v;
export const convertToRawToken = (v: string): RawToken =>
  (TOKENS as readonly string[]).includes(v) ? v : convertToValue(v);

  /*
type Value = number;
type Tree = {
  rValue: Value | Tree;
} & (
  | {}
  | {
      lValue: Value | Tree;
      operator: Operator;
    }
);

export const defaultPattern = Symbol('defaultPattern');
type MatchArgType =
  | boolean
  | string
  | {}
  | number
  | Symbol
  | any[]
  | undefined
  | null;
type Matcher<T extends MatchArgType> = T | ((value: T) => boolean);
type Resolver<T, U> = U | ((value: T) => U);
type DefaultResolver<U> = U | (() => U);
type Pattern<T extends MatchArgType, U> =
  | [Matcher<T>, Resolver<T, U>]
  | [typeof defaultPattern, DefaultResolver<U>];
export const pattern = <T extends MatchArgType, U>(
  patterns: Pattern<T, U>[]
) => (arg: T): U | null => {
  const resolver = patterns.find(([p]) => {
    if (p === defaultPattern) {
      return true;
    }
    if (typeof p === 'function') {
      return p(arg);
    }
    return p === arg;
  });
  if (typeof resolver === 'undefined') {
    return null;
  }
  if (resolver[0] === defaultPattern) {
    const defaultResolver: DefaultResolver<U> = resolver[1] as any;
    if (typeof defaultResolver === 'function') {
      return defaultResolver();
    }
    return defaultResolver;
  }
  if (typeof resolver[1] === 'function') {
    return resolver();
  }
};*/

interface ParserState {
  next(nextToken: Token): ParserState;
}

class EmptyTree implements ParserState {
  next(nextToken: Token): ParserState {}
}

export const parse = (t: Token[]): Tree | null => {
  const stack: Token[] = [];
  for (let i = 0; i < t.length; i += 1) {
    const nextToken = t[i];
  }
};
