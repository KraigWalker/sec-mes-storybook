import s from './ImposterSegment.module.css';

/**
 * A false-front element that displays a Segment label in an alternative colour
 * when the `SegmentedControl`'s `Stepper` is hovered over it.
 * Content is not voiced or interactive. Events should pass through to the
 * semantically correct and interactive `Segment` directly underneath, giving
 * the illusion that there is only one element.
 * @param {string} label
 */
export function ImposterSegment({ label }) {
  return (
    <div className={s.imposterSegment}>
      <span className={s.label} aria-hidden="true">
        {label}
      </span>
    </div>
  );
}
