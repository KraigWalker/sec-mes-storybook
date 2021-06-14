import { Link } from 'react-router-dom';

function MessageListItem({ id }) {
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
            <time>01 Oct 2021</time>
          </dt>
        </dl>
      </Link>
    </li>
  );
}

export { MessageListItem };
