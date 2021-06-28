import { MessageListItem } from '../MessageListItem';
import { useGetMessagesQuery } from '../../messagesApi';
import { useSelector } from 'react-redux';
import { FixedSizeList } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';

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
    <ol
      style={{
        position: 'relative',
        display: 'block',
        height: '100vh',
        width: '100%',
      }}
    >
      {!isLoading && !isFetching && (
        <AutoSizer disableWidth={true}>
          {({ height, width }) => (
            <FixedSizeList
              height={height}
              width={width}
              itemSize={240}
              itemCount={messages.length}
            >
              {({ index }) => (
                <MessageListItem
                  dateCreated={messages[index].date_created}
                  key={`message_item_${
                    messages[index].id || `_no_id_${index}`
                  }'}`}
                />
              )}
            </FixedSizeList>
          )}
        </AutoSizer>
      )}
    </ol>
  );
}

// messages.map(({ id, date_created }, index) => (
//   <MessageListItem
//     id={id}
//     dateCreated={date_created}
//     key={`message_item_${id || `_no_id_${index}`}'}`}
//   />
// ))}*/

export { MessageList };
