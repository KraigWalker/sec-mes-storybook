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
    else if (type === 'ARCHIVED')
    {
        return 'ARCHIVED';
    }
}

export function updateMessageStatus(message, status){
    message.status = status;
    return message;
}

/**
 * Truncates text where necessary, adding elipsis if text has been chopped off
 * @param {string} text 
 * @param {number} limit 
 */
export function truncateMessage(text, limit) {
    const newText = truncateText(text, limit);
    return (newText === text)
        ? text
        : `${newText}...`
}

/**
 * Returns truncated text (split on space nearest limit, or limit if no spaces...)
 * 
 * @param {string} text 
 * @param {number} limit 
 */
export function truncateText(text, limit) {
    if (!text.includes(' ')) {
        return text.substr(0, limit);
    }
    const nearestSpacePosition = findSpaceNearestToPosition(text, limit);
    return text.substring(0, nearestSpacePosition);
}

function findSpaceNearestToPosition(text, position) {
    if (text[position] === ' ') {
        return position;
    }
    const spaceBeforeIdx = text.substring(0, position).lastIndexOf(" ");
    const spaceAfterIdx = text.indexOf(" ", position);
    
    if (spaceBeforeIdx !== -1 && spaceAfterIdx !== -1)
    {
        const distanceToBefore = position - spaceBeforeIdx;
        const distanceToAfter = spaceAfterIdx - position;
        return distanceToBefore < distanceToAfter 
            ? spaceBeforeIdx
            : spaceAfterIdx;
    }

    return spaceBeforeIdx !== -1 
        ? spaceBeforeIdx
        : spaceAfterIdx;
}