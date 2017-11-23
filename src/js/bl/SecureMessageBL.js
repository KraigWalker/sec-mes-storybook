import _ from  'lodash';
import MessageEntity from '../entities/MessageEntity';

/**
 * 
 * @param {array of Messages} parses all messages and creates 3 different arrays for INBOX/DRAFT/SENT.
 */

export function SecureMessageBL(response) {
  
    const inboxMessages = [];
    const sentMessages = [];
    const draftMessages = [];

    _.map(response.messages, message => {
        switch (message.status){
            case "NEW":
                inboxMessages.push(message);
            break;
            case "PENDING":
                sentMessages.push(message);
            break;
            case "DRAFT":
                draftMessages.push(message);
            break;
        }
    });
    return {inboxMessages,sentMessages,draftMessages};
}
