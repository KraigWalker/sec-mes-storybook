import _ from 'lodash';
import moment from 'moment';
import { NEW, DRAFT, PENDING, SENT, ARCHIVED, READ } from '../constants/StringsConstants';
import SendMessageRequestEntity from '../entities/SendMessageRequestEntity';
import { isNullOrUndefined } from '../utils/GeneralUtils';
import RegexUtils from '../utils/RegexUtils';

const INBOX_MESSAGES = 'inboxMessages';
const SENT_MESSAGES = 'sentMessages';
const DRAFT_MESSAGES = 'draftMessages';
const ARCHIVED_MESSAGES = 'archivedMessages';

const statusToStartQueue = {
  [NEW]: INBOX_MESSAGES,
  [READ]: INBOX_MESSAGES,
  [SENT]: SENT_MESSAGES,
  [PENDING]: SENT_MESSAGES,
  [DRAFT]: DRAFT_MESSAGES,
  [ARCHIVED]: ARCHIVED_MESSAGES,
};

const assignMessageToQueueBuilder = ({ readingMessages = [], archivingMessages = [], unarchivingMessages = [] }) => ({
  [INBOX_MESSAGES]: message => {
    let newMessage = message;
    let queue = INBOX_MESSAGES;
    if (archivingMessages.includes(message.id)) {
      queue = ARCHIVED_MESSAGES;
      newMessage = message.cloneWithUpdatedStatus(ARCHIVED);
    } else if (readingMessages.includes(message.id)) {
      newMessage = message.cloneWithUpdatedStatus(READ);
    }
    return { queue, message: newMessage };
  },
  [DRAFT_MESSAGES]: message => ({ queue: DRAFT_MESSAGES, message }),
  [SENT_MESSAGES]: message => ({ queue: SENT_MESSAGES, message }),
  [ARCHIVED_MESSAGES]: message => {
    let queue, newMessage;
    if (unarchivingMessages.includes(message.id)) {
      queue = INBOX_MESSAGES;
      newMessage = message.cloneWithUpdatedStatus(READ);
    } else {
      queue = ARCHIVED_MESSAGES;
      newMessage = message;
    }
    return { queue, message: newMessage };
  },
});

/**
 * Split messages into categories.
 * Remove any messages that have been marked for deletion optimistically
 * Add any messages marked for archive/unarchive optimistically
 * Any messages that are marked as being READ should be returned as such
 * Iteration performed through messages done only once
 */
export const SecureMessageBL = messageState => {
  const { deletingMessages = [], messages } = messageState;
  const assignMessageToQueue = assignMessageToQueueBuilder(messageState);

  return messages.reduce(
    (agg, curr) => {
      if (!deletingMessages.includes(curr.id)) {
        const startQueue = statusToStartQueue[curr.status];
        const { queue, message } = assignMessageToQueue[startQueue](curr);
        agg[queue].push(message);
      }
      return agg;
    },
    {
      [INBOX_MESSAGES]: [],
      [SENT_MESSAGES]: [],
      [DRAFT_MESSAGES]: [],
      [ARCHIVED_MESSAGES]: [],
    }
  );
};

/**
 * to fetch all related threads on the current message.
 * @param {array} messages //total list of secure messages.
 * @param {object} currentMessage //current message.
 */
export function getThreadsBL({ messages = [], deletingMessages = [], currentMessage }) {
  return messages.filter(
    message =>
      message.threadID === currentMessage.threadID &&
      deletingMessages.indexOf(message.id) === -1 &&
      moment(message.dateCreated, 'DD-MMM-YYYY HH:mm').isBefore(moment(currentMessage.dateCreated, 'DD-MMM-YYYY HH:mm'))
  );
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

export function BuildSendMessageRequestEntity(accounts, messageEntity) {
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
  return message.account && message.account.number ? message.account.number : content.noSpecificAccount;
}

export const maskCardDetails = message => {
  const matchCardDetails = RegexUtils.matchCardDetails(message);
  let maskedMessage;
  if (matchCardDetails !== null) {
    const lastFour = RegexUtils.getLastFourDigits(matchCardDetails);
    maskedMessage = message.replace(new RegExp(matchCardDetails, 'g'), `************${lastFour}`);
  } else maskedMessage = message;
  return maskedMessage;
};
