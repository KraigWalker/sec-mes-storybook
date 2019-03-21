import React from "react";
import {
  SecureButton,
  SecureLink,
  SecureButtonIcon
} from "./SecureMessageButton";
import getOptionDisplayFunctions from "../common/MessageOptions";
import cx from 'classnames';
import GetIcon from './GetIcon';
import { NEW } from '../../constants/StringsConstants';

const SecureMessageSummaryButtons = props => {
  const optionFunctions = getOptionDisplayFunctions(props.readOnly, props.noReply);

  const actionsClass = cx({
    "c-message__summary__head__actions": true,
    "u-position-relative": !props.threadFlag
  });

  const PendingStatus = () => {
    return (
      <SecureButtonIcon name="pending" description={props.content.pending}>
        <GetIcon
          id="icon-outline-large"
          viewbox="0 0 16 16"
          width="24px"
          height="24px"
        />
      </SecureButtonIcon>
    );
  };

  const getDeleteMessage = (content, message) => {
    let deletemessage;
    if (!message.status !== NEW) {
      deletemessage = `${content.delete} ${message.getSubject()}`;
    } else {
      deletemessage = `${content.deleteUnread} ${message.getSubject()}`;
    }
    return deletemessage;
  };

  const getReplyButton = () => {
    const { message, threadFlag, viewMessageFlag, content } = props;

    const backpath = viewMessageFlag
      ? `/securemessages/view`
      : `/securemessages`;

    let replymessage;
    if (message.status === "READ") {
      replymessage = `${content.replyMessageTitle} ${message.getSubject()}`;
    } else {
      replymessage = `${content.replyUnread} ${message.getSubject()}`;
    }

    return (
      !threadFlag && (
        <SecureLink
          name="reply"
          label={content.replyMessageTitle}
          message={message}
          path="/securemessages/reply"
          backpath={backpath}
          description={replymessage}
        >
          <GetIcon id="icon-reply" width="24px" height="24px" />
        </SecureLink>
      )
    );
  };

  const {message, content, threadFlag } = props;

  return (
    <div className={actionsClass}>
      {optionFunctions.showReplyButton(message.status) &&
        getReplyButton(message)}
      {!threadFlag && optionFunctions.showDeleteButton(message.status) && (
        <SecureButton
          name={content.delete}
          label={content.delete}
          message={message}
          onClick={props.onDeleteClick}
          description={getDeleteMessage(content, message)}
        />
      )}
      {!threadFlag && optionFunctions.showArchiveButton(message.status) && (
        <SecureButton
          name={content.archive}
          label={content.archive}
          message={message}
          onClick={props.onArchiveClick}
        />
      )}
      {!threadFlag && optionFunctions.showUnarchiveButton(message.status) && (
        <SecureButton
          name={content.unarchive}
          label={content.moveToInbox}
          message={message}
          onClick={props.onUnarchiveClick}
        />
      )}
      {!threadFlag &&
        optionFunctions.showPending(message.status) &&
        PendingStatus()}
    </div>
  );
};

export default SecureMessageSummaryButtons;
