import { Link, useRouteMatch } from 'react-router-dom';
import { SegmentedControl } from '../../components/SegmentedControl';
import { MessageList } from '../../components/MessageList';

function SecureMessageListView() {
  const { url } = useRouteMatch();

  return (
    <div>
      <Link to={`${url}/new`}>New Secure Message</Link>
      <div>Success Modal (?)</div>
      <div>
        <SegmentedControl />
        <main id="main">
          <MessageList messages={[{ id: '123' }, { id: '456' }]} />
        </main>
      </div>
    </div>
  );
}

export { SecureMessageListView };
