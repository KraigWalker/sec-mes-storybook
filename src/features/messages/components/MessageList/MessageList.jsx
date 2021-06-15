import { MessageListItem } from '../MessageListItem';
import { useGetMessagesQuery } from '../../messagesApi';
import { useSelector } from 'react-redux';

function MessageList() {
  const accessToken = useSelector((state) => state.auth.accessToken);
  const bankId = useSelector((state) => state.session.bankId);
  const skip = accessToken == null || typeof bankId !== 'string';

  const {
    data: messages = [],
    isLoading,
    isFetching,
  } = useGetMessagesQuery(undefined, { skip });

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
