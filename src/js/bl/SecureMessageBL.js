import _ from 'lodash';
import moment from 'moment';
import { NEW, DRAFT, PENDING, SENT, ARCHIVED } from '../constants/StringsConstants';
import SendMessageRequestEntity from "../entities/SendMessageRequestEntity";
import { isNullOrUndefined } from '../utils/GeneralUtils';
import RegexUtils from "../utils/RegexUtils"
/**
 * @param messages Array parses all messages and creates 3 different arrays for INBOX/DRAFT/SENT.
 * @param deletingMessages Array array of messages sent to backend for correct status to DELETE (DELETE).
 */
export function SecureMessageBL({messages, deletingMessages}) {
	const activeMessages = messages.filter(message => deletingMessages.indexOf(message.id) < 0);
	const inboxMessages = activeMessages.filter(message => message.status === NEW);
	const sentMessages = [
		...activeMessages.filter(message => message.status === PENDING),
		...activeMessages.filter(message => message.status === SENT),
	];
	const draftMessages = activeMessages.filter(message => message.status === DRAFT);
	const archivedMessages = activeMessages.filter(message => message.status === ARCHIVED);
	return {inboxMessages, sentMessages, draftMessages, archivedMessages};
}
/**
 * to fetch all related threads on the current message.
 * @param {array} messages //total list of secure messages.
 * @param {object} currentMessage //current message.
 */
export function getThreadsBL(messages, currentMessage) {
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

    if (!isNullOrUndefined(account) && !isNullOrUndefined(account.accountId)) {
		const accName = getAccountName(account.accountId, accounts);
        const accountNameNew = accName.display_name || accName.name;
        sendMessageRequestEntity.setName(accountNameNew);
        sendMessageRequestEntity.setAccountId(account.accountId);
        sendMessageRequestEntity.setAccountNumber(account.number);
	}
    return sendMessageRequestEntity;
}

export function getMessageAccountValue(message, content) {

	return message.account && message.account.number
		? message.account.number
		: content.noSpecificAccount;
}

export const maskCardDetails = (message) => {
	const matchCardDetails = RegexUtils.matchCardDetails(message);
	let maskedMessage;
	if (matchCardDetails !== null) {
		const lastFour = RegexUtils.getLastFourDigits(matchCardDetails);
		maskedMessage = message.replace(new RegExp(matchCardDetails, 'g'), `************${lastFour}`);
	}
	else maskedMessage = message;
	return maskedMessage;
}
