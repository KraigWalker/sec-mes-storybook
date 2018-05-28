 /**
 * @class DateUtils
 */

/**
 * Retruns message type for Sent and Inbox tabs
 * @param  {String} dateStr e.g. format - 'YYYY-MM-DD'
 */
export function getMessageType(type){
    if(type == 'SENT' || type == 'PENDING'){
        return 'SENT';
    } else if(type == 'NEW' || type == 'READ'){
        return 'INBOX';
    }
}

export function updateMessageStatus(message, status){
    message.status = status;
    return message;
}
