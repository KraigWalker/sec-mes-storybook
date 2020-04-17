import React from "react";
import { Button } from "web-ui-components/lib/atoms/buttons";
import { Mail } from "web-ui-components/lib/communication/messaging";
import { ButtonGroup } from 'web-ui-components/lib/molecules/buttons';
import withMessaging from "./common/WithMessaging";
import {ARCHIVED} from '../constants/StringsConstants';
import {TEXT_LIMIT} from "../constants/NumericalConstants";
import Attachment from "./common/Attachment";
import {DocumentDownloadLink} from 'document-management-lib';
import {truncateMessage} from "../utils/SecureMessageUtils";

const attachmentLink = (props, document) => {
  return (window.navigator && window.navigator.msSaveOrOpenBlob)
      ? <DocumentDownloadLink documentId={document.id} documentName={document.label} />
      : <Attachment {...props} document={document}/>
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
          mailSummary={truncateMessage(message.message, TEXT_LIMIT)}
          mailDate={message.dateCreated}
		  isRead
		  mailOnClick={() => {}}
        />
      </Mail.Header>
      <Mail.Body>
        <p>{message.message}</p>
        { hasAttachment && attachmentLink(props, message.document) }
        <ButtonGroup>
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
