const tokenize = (input: string): string[] => {
  return input.split(' ');
};
const isXScale = (prefix: string) => (t: string): boolean => {
  if (t.length !== 2) {
    return false;
  }
  if (t[0] !== prefix.toLowerCase() && t[0] !== prefix.toUpperCase()) {
    return false;
  }
  const charCode = t.charCodeAt(1);

  // '0' <= charCode <= '9'
  return 0x30 <= charCode && charCode <= 0x39;
};
const isAScale = isXScale('a');
const isBScale = isXScale('b');
const AScale: { [key: number]: { width: number; height: number } } = {
  0: { height: 1189, width: 841 },
  1: { height: 841, width: 594 },
  2: { height: 594, width: 420 },
  3: { height: 420, width: 297 },
  4: { height: 297, width: 210 },
  5: { height: 210, width: 148 },
  6: { height: 148, width: 105 },
  7: { height: 105, width: 74 },
  8: { height: 74, width: 52 },
  9: { height: 52, width: 37 },
  10: { height: 37, width: 26 },
};
const BScale: { [key: number]: { width: number; height: number } } = {
  0: { height: 1456, width: 1030 },
  1: { height: 1030, width: 728 },
  2: { height: 728, width: 515 },
  3: { height: 515, width: 364 },
  4: { height: 364, width: 257 },
  5: { height: 257, width: 182 },
  6: { height: 182, width: 128 },
  7: { height: 128, width: 91 },
  8: { height: 91, width: 64 },
  9: { height: 64, width: 45 },
  10: { height: 45, width: 32 },
};
const isDpi = (t: string): boolean => /\d+dpi/i.test(t);
const parse = (input: string[]) => {
  let width = 0;
  let height = 0;
  let is2DScale = false;
  let unit = '';
  for (const t of input) {
    if (isAScale(t)) {
      unit = 'mm';
      is2DScale = true;
      width = AScale[parseInt(t[1], 10)].width;
      height = AScale[parseInt(t[1], 10)].height;
    }
    if (isBScale(t)) {
      unit = 'mm';
      is2DScale = true;
      width = BScale[parseInt(t[1], 10)].width;
      height = BScale[parseInt(t[1], 10)].height;
    }
    if (isDpi(t)) {
      unit = 'px';
      width = Math.round((width / 25.4) * parseInt(t, 10));
      height = Math.round((height / 25.4) * parseInt(t, 10));
    }
  }
  if (!is2DScale) {
    throw new Error();
  }
  return `${width}${unit} x ${height}${unit}`;
};
const calc = (input: string): string => {
  const tokenized = tokenize(input);
  return parse(tokenized);
};
export default calc;
