import s from './MetadataBar.module.css';

export function MetadataBar({ accountName = 'No specific account' }) {
  return (
    <div className={s.metadataBar}>
      <div>
        <p>{accountName}</p>
      </div>
      <div>
        <time>
          <p>Today</p>
          <p>08:45</p>
        </time>
      </div>
    </div>
  );
}
