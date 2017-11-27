import _ from  'lodash';
import MessageEntity from '../entities/MessageEntity';
import moment from 'moment';

/**
 * 
 * @param {array of Messages} parses all messages and creates 3 different arrays for INBOX/DRAFT/SENT.
 */

export function SecureMessageBL(response) {
  
    const inboxMessages = [];
    const sentMessages = [];
    const draftMessages = [];
    console.log(response);
    _.map(response.messages, message => {
        switch (message.status){
            case "NEW":
            case "READ":
                inboxMessages.push(message);
            break;
            case "DRAFT":
                draftMessages.push(message);
            break;
            case "PENDING":
            case "SENT":
                sentMessages.push(message);
            break;
            
        }
    });
    console.log(sentMessages);
    return {inboxMessages,sentMessages,draftMessages};
}
    /**
     * to fetch all related threads on the cureent message.
     * @param {array} messages //total list of secure messages.
     * @param {object} currentMessage //current message.
     */
    export function getThreadsBL(messages, currentMessage) {
        return messages.filter(message => message.threadID === currentMessage.threadID && moment(currentMessage.dateCreated).isSameOrAfter(message.dateCreated));
    }
