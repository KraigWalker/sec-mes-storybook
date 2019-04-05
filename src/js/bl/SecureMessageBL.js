import _ from 'lodash';
import moment from 'moment';
import { NEW, READ, DRAFT, PENDING, SENT, ARCHIVED } from '../constants/StringsConstants';
import SendMessageRequestEntity from "../entities/SendMessageRequestEntity";
/**
 *
 * @param {array of Messages} parses all messages and creates 3 different arrays for INBOX/DRAFT/SENT.
 */

export function SecureMessageBL(response) {
	const inboxMessages = [];
	const sentMessages = [];
	const draftMessages = [];
	const archivedMessages = [];
	_.map(response.messages, message => {
		switch (message.status) {
			case NEW:
			case READ:
				inboxMessages.push(message);
				break;
			case DRAFT:
				draftMessages.push(message);
				break;
			case ARCHIVED:
				archivedMessages.push(message);
				break;
			case PENDING:
			case SENT:
				sentMessages.push(message);
				break;
			default:
		}
	});
	return { inboxMessages, sentMessages, draftMessages, archivedMessages };
}
/**
 * to fetch all related threads on the cureent message.
 * @param {array} messages //total list of secure messages.
 * @param {object} currentMessage //current message.
 */
export function getThreadsBL(messages, currentMessage) {
	// Enable it for LOG. ---- messages.filter(message => console.log("old date: "+message.dateCreated+" current date: "+currentMessage.dateCreated+" Condition: "+moment(moment(message.dateCreated, "DD-MM-YYYY")).isBefore(moment(currentMessage.dateCreated, "DD-MM-YYYY"))) );
	return messages.filter(message => message.threadID === currentMessage.threadID && moment(message.dateCreated, 'DD-MMM-YYYY HH:mm').isBefore(moment(currentMessage.dateCreated, 'DD-MMM-YYYY HH:mm')));
}

// Code for adding accounts name in draft
export function getAccountName(id, accounts) {
	if (id) {
		return _.find(accounts, accData => {
			if (accData.accountId === id) {
				const name = accData.display_name || accData.name;
				return name;
			}
		});
	}
	return 'No specific account';
}


export function BuildSendMessageRequestEntity(accounts, messageEntity ) {
    const { subject, account, message } = messageEntity;

    const sendMessageRequestEntity = new SendMessageRequestEntity();
    sendMessageRequestEntity.setUpdateSubject(subject);
    sendMessageRequestEntity.setMessage(message);

    const accName = getAccountName(account.accountId, accounts);
    if ((account.accountId !== undefined || null) && subject) {
        let accountNameNew = accName.display_name || accName.name;
        sendMessageRequestEntity.setName(accountNameNew);
        sendMessageRequestEntity.setAccountId(account.accountId);
        sendMessageRequestEntity.setAccountNumber(account.number);
    }
    if (account.accountId === undefined || null) {
        sendMessageRequestEntity.setAccount(account);
	}
    return sendMessageRequestEntity;
}

export function getMessageAccountValue(message, content) {

	return message.account && message.account.number
		? message.account.number
		: content.noSpecificAccount;
}