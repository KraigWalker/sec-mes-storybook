import React from "react";
import { Button } from "web-ui-components/lib/atoms/buttons";
import { Mail } from "web-ui-components/lib/communication/messaging";
import { Link } from 'react-router-dom';
import { ButtonGroup } from 'web-ui-components/lib/molecules/buttons';
import withMessaging from "./common/WithMessaging";

export const Attachments = ({ session, client, document }) => (
  <div>
    <h4>Attachments</h4>
    <ul>
      <li>
        <Link
          target="_blank"
          to={{
            pathname: `/my-documents/${session.brand}/${
              document.id
            }#access_token=${session.access_token}&bank_id=${
              session.bank_id
            }&client_context=${client.client.app_title}&user_tracking_id=${
              client.client.user_tracking_id
            }&brandId=${session.bank_id}&state=${session.state}`
          }}
        >
          {document.label}
        </Link>
      </li>
    </ul>
  </div>
);

const MailMessage = props => {
  const {
    hasAttachment,
    session,
    client,
    content,
    history,
	message,
	showDelete,
	showArchive,
	showUnarchive,
	showReply
  } = props;

  const onArchiveClick = () => props.onArchiveClick(message);
  const onUnarchiveClick = () => props.onUnarchiveClick(message);
  const onDeleteClick = () => props.onDeleteClick(message);
  const onReplyClick = () => props.onReplyClick(message);

  return (
    <div>
      <Mail.ToolBar
        label="Back to inbox"
        archiveOnClick={
          showArchive
            ? onArchiveClick
            : null
        }
        replyOnClick={
          showReply ? onReplyClick : null
        }
        deleteOnClick={
          showDelete
            ? onDeleteClick
            : null
        }
        labelOnClick={history.goBack}
      />
      <Mail.Header>
        <Mail.Item
          id="0"
          mailSubject={message.subject}
          mailSummary={message.message}
          mailDate={message.dateCreated}
		  isRead
		  mailOnClick={() => {}}
        />
      </Mail.Header>
      <Mail.Body>
        <p>{message.message}</p>
        {hasAttachment && (
          <Attachments session={session} document={message.document} client={client} />
        )}
        <ButtonGroup>
          <Button display="secondary" width="narrow" onClick={history.goBack}>
            {content.back}
          </Button>
          {showDelete ? <Button display="secondary" onClick={onDeleteClick} width='narrow'>{content.delete}</Button> : null} 
          {showUnarchive ? <Button display="secondary" onClick={onUnarchiveClick} width='narrow'>{content.unarchive}</Button> : null}
          {showArchive ? <Button display="secondary" onClick={onArchiveClick} width='narrow'>{content.archive}</Button> : null} 
          {showReply ? <Button display="secondary" onClick={onReplyClick} width='narrow'>{content.replyMessageTitle}</Button> : null}
        </ButtonGroup>
      </Mail.Body>
    </div>
  );
};

export default withMessaging(MailMessage);
