export type ByteType = 'MB' | 'GB' | 'TB' | 'KB';
export const byteList: ByteType[] = ['KB', 'MB', 'GB', 'TB'];

export const calcValue = (
  bytes: number,
  byteType: ByteType,
  length: string,
  outByteType: ByteType
) =>
  ((bytes *
    1000 ** (byteList.indexOf(byteType) - byteList.indexOf(outByteType))) /
    length
      .split(':')
      .map((v, i, a) => parseInt(v, 10) * 60 ** (a.length - i - 1))
      .reduce((p, c) => p + c, 0)) *
  8;
