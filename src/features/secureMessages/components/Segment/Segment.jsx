import { Link } from 'react-router-dom';

export function Segment({ label, to, isCurrent = false }) {
  return (
    <li>
      {isCurrent ? (
        <span className={'current'}>
          <span className="visuallyhidden">Current Page: </span>
          <span>{label}</span>
        </span>
      ) : (
        <Link to={to}>{label}</Link>
      )}
    </li>
  );
}
