import { useSelector } from 'react-redux';
import { MessageListItem } from '../MessageListItem';
import { useGetMessagesQuery } from '../../messagesApi';
import { useGetAccountsQuery } from '../../../accounts/accountsApi';
import s from './MessageList.module.css';

const useAuth = process.env.NODE_ENV === 'production';

function MessageList({ statusFilter = 'Inbox' }) {
  const accessToken = useSelector((state) => state.auth.accessToken);
  const bankId = useSelector((state) => state.session.bankId);
  const skip = (useAuth && accessToken == null) || typeof bankId !== 'string';

  const {
    data: accounts = [],
    isLoadingAccounts,
    isFetchingAccounts,
  } = useGetAccountsQuery(undefined, { skip });

  const {
    data: messages = [],
    isLoading,
    isFetching,
  } = useGetMessagesQuery(undefined, { skip });

  console.dir(accounts);

  const filteredMessages = messages.filter((message) => {
    if (statusFilter === 'Inbox') {
      return message.status === 'NEW' || message.status === 'READ';
    } else {
      return message.status === statusFilter;
    }
  });

  return (
    <>
      <ol className={s.messageList}>
        {!isLoading &&
          !isFetching &&
          !isLoadingAccounts &&
          !isFetchingAccounts &&
          filteredMessages.map(
            ({ id, subject, date_created, account }, index) => {
              return (
                <MessageListItem
                  id={id}
                  subject={subject}
                  account={
                    account
                      ? accounts.find((element) => element.id === account.id) ||
                        {}
                      : {}
                  }
                  dateCreated={date_created}
                  key={`message_item_${id || `_no_id_${index}`}'}`}
                />
              );
            }
          )}
      </ol>
      <p className={s.endText}>
        {filteredMessages.length > 0
          ? "That's everything."
          : 'Nothing to see here.'}
      </p>
    </>
  );
}

export { MessageList };
