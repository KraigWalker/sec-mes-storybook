import { MessageListItem } from '../MessageListItem';

function MessageList({ messages }) {
  return (
    <ol>
      {messages.map(({ id }, index) => (
        <MessageListItem
          id={id}
          key={`message_item_${id || `_no_id_${index}`}'}`}
        />
      ))}
    </ol>
  );
}

export { MessageList };
