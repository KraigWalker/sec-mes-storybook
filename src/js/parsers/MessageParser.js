import _ from  'lodash';
import MessageEntity from '../entities/MessageEntity';

/**
 * 
 * @param {array of Messages} parses the service response 
 */
export function parseMessages(response) {
    console.log(response);
    const messages = [];
    _.forEach(response.securemessages, message => {
        const messageEntity = new MessageEntity();
        messageEntity.setDateCreated(message.date_created);
        // messageEntity.setAccount(message.account); // Account Entity to be hooked 
        messageEntity.setThreadId(message.thread_id);
        messageEntity.setReference(message.reference);
        messageEntity.setStatus(message.status);
        messageEntity.setSubject(message.subject);
        messageEntity.setAccount(message.account);
        // messageEntity.setMessageBody(message.payload.body.data);
        messages.push(messageEntity);
    });
    return messages;

}