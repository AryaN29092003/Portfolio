import { useEffect, useRef } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';
import './GlyphField.css';

const RAMP = ['·', ':', '=', '+', 'o', '0'];
const CELL = 14;
const RADIUS = 95;
const hash = (c: number, r: number) => {
  const n = Math.sin(c * 127.1 + r * 311.7) * 43758.5453;
  return n - Math.floor(n);
};

/**
 * Decorative canvas: a grid of small glyphs that brighten around the pointer.
 * It listens on its parent section, drifts on its own on touch devices, and
 * renders one static frame under reduced motion.
 */
export function GlyphField() {
  const ref = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = ref.current;
    const host = canvas?.parentElement;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !host || !ctx) return;

    let w = 0;
    let h = 0;
    let raf = 0;
    let visible = false;
    let lastMove = -1e9;
    const target = { x: 0, y: 0 };
    const pos = { x: 0, y: 0 };
    const coarse = window.matchMedia('(pointer: coarse)').matches;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      w = host.clientWidth;
      h = host.clientHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.font = `${CELL - 2}px ui-monospace, Menlo, Consolas, monospace`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      if (!lastMoveSeen()) {
        target.x = pos.x = w * 0.28;
        target.y = pos.y = h * 0.5;
      }
    };
    const lastMoveSeen = () => lastMove > -1e8;

    const draw = (now: number) => {
      ctx.clearRect(0, 0, w, h);
      const cols = Math.ceil(w / CELL);
      const rows = Math.ceil(h / CELL);
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = c * CELL + CELL / 2;
          const y = r * CELL + CELL / 2;
          const dx = x - pos.x;
          const dy = y - pos.y;
          const near = Math.exp(-(dx * dx + dy * dy) / (2 * RADIUS * RADIUS));
          const drift =
            (Math.sin(x * 0.011 + now * 0.0004) + Math.sin(y * 0.015 - now * 0.0003) + 2) / 4;
          const level = Math.min(1, near * 1.05 + drift * 0.1);
          // Per-cell threshold: the edge of the cluster dissolves instead of ending in a hard line.
          const dither = hash(c, r);
          if (level < 0.1 || level < dither * 0.75) continue;
          const glyph = RAMP[Math.min(RAMP.length - 1, Math.floor(level * RAMP.length))];
          const alpha = Math.min(0.3, 0.06 + level * 0.28);
          ctx.fillStyle = level > 0.85 ? `rgba(240,207,122,${alpha + 0.08})` : `rgba(168,180,225,${alpha})`;
          ctx.fillText(glyph, x, y);
        }
      }
    };

    const loop = (now: number) => {
      raf = 0;
      if (!visible) return;
      if (coarse || now - lastMove > 2500) {
        target.x = w * (0.5 + 0.35 * Math.sin(now * 0.00021));
        target.y = h * (0.5 + 0.3 * Math.sin(now * 0.00033 + 1));
      }
      pos.x += (target.x - pos.x) * 0.08;
      pos.y += (target.y - pos.y) * 0.08;
      draw(now);
      raf = requestAnimationFrame(loop);
    };

    const start = () => {
      if (!raf && visible) raf = requestAnimationFrame(loop);
    };

    const onMove = (e: PointerEvent) => {
      const rect = host.getBoundingClientRect();
      target.x = e.clientX - rect.left;
      target.y = e.clientY - rect.top;
      lastMove = performance.now();
    };

    resize();
    const ro = new ResizeObserver(() => {
      resize();
      if (reduced) draw(0);
    });
    ro.observe(host);

    if (reduced) {
      draw(0);
      return () => ro.disconnect();
    }

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
    });
    io.observe(host);
    host.addEventListener('pointermove', onMove, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      host.removeEventListener('pointermove', onMove);
    };
  }, [reduced]);

  return <canvas ref={ref} className="glyph-field" aria-hidden="true" />;
}
