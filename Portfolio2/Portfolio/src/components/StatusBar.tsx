import { sections, site } from '../data/site';
import { useClock } from '../hooks/useClock';
import { ScrambleText } from './ScrambleText';
import './StatusBar.css';

/** Fixed bottom bar: section counter, current section name, live clock. Decorative, so hidden from assistive tech. */
export function StatusBar({ active }: { active: number }) {
  const time = useClock(site.timeZone);
  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <div className="status" aria-hidden="true">
      <span>
        {pad(active + 1)} / {pad(sections.length)}
      </span>
      <span className="status__label">
        <ScrambleText text={sections[active].label} />
      </span>
      <span className="status__clock">
        {site.timeZoneLabel} {time}
      </span>
    </div>
  );
}
