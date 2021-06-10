import { Link, useRouteMatch } from 'react-router-dom';
import { SegmentedControl } from '../../components/SegmentedControl';
import { MessageList } from '../../components/MessageList';

function SecureMessageListView() {
  const { url } = useRouteMatch();

  return (
    <div>
      <h1>SecureMessageListView</h1>
      <Link to={`${url}/new`}>New Secure Message</Link>
      <div>Success Modal (?)</div>
      <div>
        Secure Message Tabs
        <SegmentedControl segments={segments} />
        <div>
          Secure Message List
          <MessageList messages={[{ id: '123' }, { id: '456' }]} />
          <div>
            showMessages
            <div>
              SecureMessageSummary
              <div>
                Mail List<div>Mail Item</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { SecureMessageListView };
