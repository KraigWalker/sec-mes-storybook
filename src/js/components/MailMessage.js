import React from "react";
import { Button } from "web-ui-components/lib/atoms/buttons";
import { Mail } from "web-ui-components/lib/communication/messaging";
import { ButtonGroup } from 'web-ui-components/lib/molecules/buttons';
import withMessaging from "./common/WithMessaging";
import {ARCHIVED} from '../constants/StringsConstants';

const Attachments = ({ document, onClick }) => (
	<div className="c-message--attachments">
		<h4>Attachments</h4>
		<ul>
			<li>
				<a href="javascript:void(0)" onClick={onClick}>{document.label}</a>
			</li>
		</ul>
	</div>
);

const handleAttachmentClick = ({isWebView, session, message, client, getDocumentByIdNative}) => {
  if (!isWebView) {
    window.open(`/my-documents/${session.brand}/${message.document.id}#access_token=${session.access_token}&bank_id=${session.bank_id}&client_context=${
      client.client.app_title
      }&user_tracking_id=${client.client.user_tracking_id}&brandId=${session.bank_id}&state=${session.state}`);
    }
  else {
    getDocumentByIdNative(message.document.id, message.document.fileSize);
  }
}

const MailMessage = props => {
  const {
    hasAttachment,
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
        moveToInboxOnClick={
          showUnarchive ? onUnarchiveClick : null
        }
        isArchived={message.status === ARCHIVED}
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
        { hasAttachment && <Attachments document={message.document} onClick={() => handleAttachmentClick(props)}/> }
        <ButtonGroup>
          <Button display="secondary" width="narrow" onClick={history.goBack}>
            {content.back}
          </Button>
           {showArchive ? <Button display="secondary" onClick={onArchiveClick} width='narrow'>{content.archive}</Button> : null} 
           {showDelete ? <Button display="secondary" onClick={onDeleteClick} width='narrow'>{content.delete}</Button> : null} 
           {showUnarchive ? <Button display="secondary" onClick={onUnarchiveClick} width='narrow'>{content.moveToInbox}</Button> : null}
           {showReply ? <Button display="primary" onClick={onReplyClick} width='narrow'>{content.replyMessageTitle}</Button> : null}
        </ButtonGroup>
      </Mail.Body>
    </div>
  );
};

export default withMessaging(MailMessage);
