import { MessageListItem } from '../MessageListItem';
import { useGetMessagesQuery } from '../../messagesApi';

function MessageList() {
  const { data: messages = [], isLoading, isFetching } = useGetMessagesQuery();

  return (
    <ol>
      {!isLoading &&
        !isFetching &&
        messages.map(({ id }, index) => (
          <MessageListItem
            id={id}
            key={`message_item_${id || `_no_id_${index}`}'}`}
          />
        ))}
    </ol>
  );
}

export { MessageList };
