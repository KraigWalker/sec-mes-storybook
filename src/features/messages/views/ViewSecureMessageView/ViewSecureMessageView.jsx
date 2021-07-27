import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useGetMessagesQuery } from '../../messagesApi';
import { MetadataBar } from '../../components/MetadataBar';
import { FullWidthButtonInput } from '../../components/FullWidthButtonInput';
import s from './ViewSecureMessageView.module.css';

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
      <div className={s.container}>
        <MetadataBar />
        <div className={s.bodyWrapper}>
          <h1 className={s.subjectHeader}>{subject}</h1>
          <p className={s.bodyText}>{body}</p>
          {document && (
            <div>
              <p>Icon</p>
              <a href="#main">{document.display_label}</a>
            </div>
          )}
        </div>
        <div className={s.buttonPositioner}>
          {!userCannotReply && (
            <FullWidthButtonInput primary={true} value="Reply" />
          )}
          <FullWidthButtonInput value="Archive" />
        </div>
      </div>
    );
  } else {
    return null;
  }
}

export { ViewSecureMessageView };
