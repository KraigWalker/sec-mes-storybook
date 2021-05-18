import { Segment } from '../Segment';

function SegmentedControl({ segments, current = 'Inbox' }) {
  return (
    <nav>
      <ul>
        {segments.map(({ label, to }) => (
          <Segment
            label={label}
            to={to}
            isCurrent={current === label}
            key={`segment_${label}`}
          />
        ))}
      </ul>
    </nav>
  );
}

export { SegmentedControl };
