import { Link } from 'react-router-dom';
import s from './Segment.module.css';

export function Segment({ label, to, isCurrent = false }) {
  return (
    <li className={s.segment}>
      {isCurrent ? (
        <span className={`${s.current} ${s.link}`}>
          <span className={s.visuallyHidden}>Current Page: </span>
          <span>{label}</span>
        </span>
      ) : (
        <Link className={s.link} to={to}>
          {label}
        </Link>
      )}
    </li>
  );
}
