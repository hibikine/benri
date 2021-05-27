import { ByteType, calcValue } from './calcVideoBytesValue';

test.each([
  [1024, 'KB', '1:00', 'KB', (1024 / 60) * 8],
  [1024, 'KB', '1', 'KB', 8192],
  [10, 'MB', '1:00:00', 'KB', 10*1000*8/3600],
] as [number, ByteType, string, ByteType, number][])(
  'calcValue(%i,%s,%s,%s)',
  (bytes, byteType, len, outByteType, expected) => {
    expect(calcValue(bytes, byteType, len, outByteType)).toBe(expected);
  }
);
