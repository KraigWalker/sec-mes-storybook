import _ from  'lodash';
import MessageEntity from '../entities/MessageEntity';
import {sortArrayByDate} from '../utils/DateUtils';

/**
 * 
 * @param {array of Messages} parses the service response 
 */
export function parseMessages(response) {
    const messages = [];
    const sortedMessages = sortArrayByDate(response.secure_messages);
    _.forEach(sortedMessages, message => {
        const messageEntity = new MessageEntity();
        messageEntity.setId(message.id);
        messageEntity.setDateCreated(message.date_created);
        // messageEntity.setAccount(message.account); // Account Entity to be hooked 
        messageEntity.setThreadId(message.thread_id);
        messageEntity.setReference(message.reference);
        messageEntity.setStatus(message.status);
        messageEntity.setSubject(message.subject);
        messageEntity.setAccount(message.account);
        messageEntity.setMessageBody(message.payload.body.data);
        messages.push(messageEntity);
    });
    return messages;

}