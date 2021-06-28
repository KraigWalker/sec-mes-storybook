import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

function MessageListItem({ id, dateCreated }) {
  return (
    <li>
      <Link to={`view/${id}`}>
        <h3>Message Name (id: {id})</h3>
        <dl>
          <dd>Account Name</dd>
          <dt>Main Account</dt>
          <dd>Sortcode and Account Number</dd>
          <dt>00-00-00 | 61234567</dt>
          <dd>Date Recieved</dd>
          <dt>
            <time>{dayjs(dateCreated).format('DD-MM-YYYY')}</time>
          </dt>
        </dl>
      </Link>
    </li>
  );
}

export { MessageListItem };
