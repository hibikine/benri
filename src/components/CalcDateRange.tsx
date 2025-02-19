import ms from 'ms';
import React, { FC, useState, useEffect } from 'react';

export const CalcDateRange: FC = () => {
  const [s, setS] = useState('10:00 - 11:00');
  const [ans, setAns] = useState('');
  useEffect(() => {
    try {
      const text = ms(s);
      setAns(`${text}`);
    } catch (e) {}
  }, [s]);
  return (
    <div>
      <input type="text" value={s} onChange={e => setS(e.target.value)} />
      <p>{ans}</p>
    </div>
  );
};
