import * as React from 'react';
import { calcValue, byteList, ByteType } from '../util/calcVideoBytesValue';
export const CalcVideoBytes: React.FC = () => {
  const [bytes, setBytes] = React.useState(1024);
  const [byteType, setByteType] = React.useState<ByteType>('GB');
  const [outByteType, setOutByteType] = React.useState<ByteType>('GB');
  const [length, setLength] = React.useState('1:30');
  const calcedValue = calcValue(bytes, byteType, length, outByteType);
  return (
    <div>
      <input
        type="number"
        value={bytes}
        onChange={e => setBytes(parseInt(e.target.value, 10))}
      />
      <select
        onChange={e => setByteType((e.target.value as unknown) as ByteType)}
      >
        {byteList.map(v => (
          <option value={v}>{v}</option>
        ))}
      </select>
      <input value={length} onChange={e => setLength(e.target.value)} />
      <input value={calcedValue} />
      <select
        onChange={e => setOutByteType((e.target.value as unknown) as ByteType)}
      >
        {byteList.map(v => (
          <option value={v}>{v.replace('B', 'b')}/s</option>
        ))}
      </select>
    </div>
  );
};
