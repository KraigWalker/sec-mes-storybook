import s from './MetadataBar.module.css';

export function MetadataBar({ accountName = 'No specific account' }) {
  return (
    <div className={s.metadataBar}>
      <p>{accountName}</p>
      <time>
        <p>Today</p>
        <p>08:45</p>
      </time>
    </div>
  );
}
