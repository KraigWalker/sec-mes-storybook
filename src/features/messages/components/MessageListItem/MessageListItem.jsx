import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import s from './MessageListItem.module.css';

function chunkSubstr(str, size) {
  const numChunks = Math.ceil(str.length / size);
  const chunks = new Array(numChunks);

  for (let i = 0, o = 0; i < numChunks; ++i, o += size) {
    chunks[i] = str.substr(o, size);
  }

  return chunks;
}

function MessageListItem({ id, subject, account, dateCreated, isUnread }) {
  return (
    <li className={s.messageListItem}>
      <Link to={`/secure-messages/view/${id}`} className={s.linkContainer}>
        <div className={s.headingContainer}>
          <h3 className={s.title}>
            <i className={s.unreadMarker}></i>
            {subject}
          </h3>
          <div>
            <span className={s.visuallyHidden}>Recieved: </span>
            <time className={s.time}>
              {dayjs(dateCreated).format('DD/MM/YYYY')}
            </time>
            <span className={s.chevron}></span>
          </div>
        </div>
        <dl className={s.detailsContainer}>
          <dd className={s.detailHeading}>Account Name</dd>
          <dt className={s.detailValue}>Main Account</dt>
          <dd className={s.detailHeading}>Sortcode and Account Number</dd>
          <dt className={s.detailValue}>
            {account && account.number ? (
              `${chunkSubstr(account.number.split('-')[0], 6).join('-')} | ${
                account.number.split('-')[1]
              }`
            ) : (
              <br />
            )}
          </dt>
        </dl>
      </Link>
    </li>
  );
}

export { MessageListItem };
