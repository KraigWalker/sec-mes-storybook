import PropTypes from 'prop-types';
import { NEW, ARCHIVED, DRAFT } from '../../constants/StringsConstants';
import withMessaging from '../common/WithMessaging';
import { Mail } from 'web-ui-components/lib/communication/messaging';
import { truncateMessage } from '../../utils/SecureMessageUtils';
import { TEXT_LIMIT } from '../../constants/NumericalConstants';

const SecureMessageSummary = (props) => {
  const handleMailClick = () => {
    const { message, threadFlag } = props;
    if (threadFlag) {
      return;
    }
    const path =
      message.status === DRAFT
        ? `/securemessages/draft`
        : `/securemessages/view`;

    props.history.push({ pathname: path, messageDetail: message });
  };

  const archiveClick = () => props.onArchiveClick(props.message);
  const unarchiveClick = () => props.onUnarchiveClick(props.message);
  const deleteClick = () => props.onDeleteClick(props.message);
  const replyClick = () => props.onReplyClick(props.message);

  const { message } = props;
  return (
    <Mail.List>
      <Mail.Item
        {...props}
        id={message.id}
        mailSubject={`${message.subject} ${
          message.reference ? message.reference : ''
        }`}
        mailSummary={truncateMessage(message.message, TEXT_LIMIT)}
        mailDate={message.dateCreated}
        isRead={message.status !== NEW}
        archiveOnClick={props.showArchive ? archiveClick : null}
        replyOnClick={props.showReply ? replyClick : null}
        deleteOnClick={props.showDelete ? deleteClick : null}
        moveToInboxOnClick={props.showUnarchive ? unarchiveClick : null}
        isArchived={message.status === ARCHIVED}
        mailOnClick={handleMailClick}
      />
    </Mail.List>
  );
};

const SecureMessageSummaryMessaging = withMessaging(SecureMessageSummary);

SecureMessageSummaryMessaging.propTypes = {
  message: PropTypes.object,
  onArchiveClick: PropTypes.func,
  onUnarchiveClick: PropTypes.func,
  onDeleteClick: PropTypes.func,
  onReplyClick: PropTypes.func,
  showArchive: PropTypes.bool,
  showReply: PropTypes.bool,
  showDelete: PropTypes.bool,
  showUnarchive: PropTypes.bool,
};

export { SecureMessageSummary };
export default SecureMessageSummaryMessaging;
