import _ from  'lodash';
import MessageEntity from '../entities/MessageEntity';

/**
 * 
 * @param {array of Messages} parses the service response 
 */

export function messageMapper(message){
    const messageEntity = new MessageEntity();
    messageEntity.setDateCreated(message.date_created);
    // messageEntity.setAccount(message.account); // Account messageEntity to be hooked 
    messageEntity.setThreadId(message.thread_id);
    messageEntity.setReference(message.reference);
    messageEntity.setStatus(message.status);
    messageEntity.setSubject(message.subject);
    messageEntity.setAccount(message.account.nummber);
    // messageEntity.setMessageBody(message.payload.body.data);
    return messageEntity;
}

export function parseMessages(response) {
    // console.log(response);
    

    const inboxMessages = [];
    const sentMessages = [];
    const draftMessages = [];

    _.map(response.securemessages, message => {
        
        switch (message.status){
            case "NEW":
                inboxMessages.push(messageMapper(message));
            break;
            case "PENDING":
                sentMessages.push(messageMapper(message));
            break;
            case "DRAFT":
                draftMessages.push(messageMapper(message));
            break;
        }
    });
    return {inboxMessages,sentMessages,draftMessages};
}