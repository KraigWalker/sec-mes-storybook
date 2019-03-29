import React from 'react';
import PropTypes from 'prop-types';
import {READ, DRAFT} from '../../constants/StringsConstants';
import withMessaging from "../common/WithMessaging";
import {Mail} from 'web-ui-components/lib/communication/messaging';

const SecureMessageSummary = (props) => {

    const viewClicked = () => {
        const {message, threadFlag} = props;
        if (threadFlag) {
            return;
        }
        const path =
            message.status === DRAFT
                ? `/securemessages/draft`
                : `/securemessages/view`;

        props.history.push({pathname: path, messageDetail: message});
    };


    const archiveClick = () => props.onArchiveClick(props.message);
    const unarchiveClick = () => props.onUnarchiveClick(props.message);
    const deleteClick = () => props.onDeleteClick(props.message);
    const replyClick = () => props.onReplyClick(props.message);

    const {message} = props;

    // const accNo = message.account.number
    // 		? message.account.number
    // 		: content.noSpecificAccount;

    return (
        <Mail.List>
            <Mail.Item
                {...props}
                id={message.id}
                mailSubject={`${message.subject} ${message.reference ? message.reference : ''}`}
                mailSummary={message.message}
                mailDate={message.dateCreated}
                isRead={message.status === READ}
                archiveOnClick={props.showArchive ? archiveClick : null}
                replyOnClick={props.showReply ? replyClick : null}
                deleteOnClick={props.showDelete ? deleteClick : null}
                mailOnClick={viewClicked}
            />
        </Mail.List>
    );

}

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
    showUnarchive: PropTypes.bool
}

export default SecureMessageSummaryMessaging;
