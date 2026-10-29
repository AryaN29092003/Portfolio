import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';

const chars = '·:=+o0';

/** Briefly scrambles when `text` changes. Static under reduced motion. */
export function ScrambleText({ text }: { text: string }) {
  const reduced = useReducedMotion();
  const [shown, setShown] = useState(text);
  const frame = useRef(0);

  useEffect(() => {
    if (reduced) {
      setShown(text);
      return;
    }
    const start = performance.now();
    const duration = 420;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const settled = Math.floor(t * text.length);
      setShown(
        text
          .split('')
          .map((c, i) => (i < settled || c === ' ' ? c : chars[Math.floor(Math.random() * chars.length)]))
          .join(''),
      );
      if (t < 1) frame.current = requestAnimationFrame(tick);
    };
    frame.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame.current);
  }, [text, reduced]);

  return <>{shown}</>;
}
