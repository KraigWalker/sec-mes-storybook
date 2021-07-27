import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useGetMessagesQuery } from '../../messagesApi';
import { MetadataBar } from '../../components/MetadataBar';

const useAuth = process.env.NODE_ENV === 'production';

function ViewSecureMessageView() {
  let { id } = useParams();
  const accessToken = useSelector((state) => state.auth.accessToken);
  const bankId = useSelector((state) => state.session.bankId);
  const skip = (useAuth && accessToken == null) || typeof bankId !== 'string';

  const {
    data: messages = [],
    isLoading,
    isFetching,
  } = useGetMessagesQuery(undefined, { skip });

  if (!isLoading && !isFetching) {
    const message = messages.filter((msg) => msg.id === id)[0];

    console.dir(message);

    const {
      date_created: dateCreated,
      subject,
      payload: {
        body: { data: body },
      },
      document,
      no_reply: userCannotReply,
    } = message;

    return (
      <div>
        <MetadataBar />
        <section>
          <h1>{subject}</h1>
          <div>
            <p>{body}</p>
          </div>
          {document && (
            <div>
              <p>Icon</p>
              <a href="#main">{document.display_label}</a>
            </div>
          )}
        </section>
        <section>
          {!userCannotReply && <button>Reply</button>}
          <button>Archive</button>
        </section>
      </div>
    );
  } else {
    return null;
  }
}

export { ViewSecureMessageView };
