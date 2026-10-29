import { useEffect, useState } from 'react';

export function useClock(timeZone: string): string {
  const format = () =>
    new Intl.DateTimeFormat('en-GB', {
      timeZone,
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }).format(new Date());

  const [time, setTime] = useState(format);

  useEffect(() => {
    const id = window.setInterval(() => setTime(format()), 15000);
    return () => window.clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeZone]);

  return time;
}
