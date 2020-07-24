import { EMPTY_MESSAGE_PLACEHOLDER } from '../constants/StringsConstants';

/**
 * @class DateUtils
 */

/**
 * Retruns message type for Sent and Inbox tabs
 * @param  {String} dateStr e.g. format - 'YYYY-MM-DD'
 */
export function getMessageType(type) {
  if (type === 'SENT' || type === 'PENDING') {
    return 'SENT';
  } else if (type === 'NEW' || type === 'READ') {
    return 'INBOX';
  } else if (type === 'ARCHIVED') {
    return 'ARCHIVED';
  }
}

export function updateMessageStatus(message, status) {
  message.status = status;
  return message;
}

/**
 * Truncates text where necessary, adding elipsis if text has been chopped off
 * @param {string} text
 * @param {number} limit
 */
export function truncateMessage(text, limit) {
  if (text) {
    const newText = truncateText(text, limit);
    if (text.length <= limit) {
      return text;
    }
    return newText === text ? text : `${newText} ...`;
  }
  return EMPTY_MESSAGE_PLACEHOLDER;
}

/**
 * Returns truncated text (split on space nearest limit, or limit if no spaces...)
 *
 * @param {string} text
 * @param {number} limit
 */
export function truncateText(text, limit) {
  if (text && text.length >= limit) {
    const subString = text.substr(0, limit);
    const lastWord = subString.lastIndexOf(' ');
    if (lastWord > -1) {
      return subString.substring(0, lastWord);
    }
    return subString;
  }
  return EMPTY_MESSAGE_PLACEHOLDER;
}
