import _ from 'lodash';
import MessageEntity from '../entities/MessageEntity';
import { sortArrayByDate } from '../utils/DateUtils';
import { isNullOrUndefined } from "../utils/GeneralUtils";

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
        messageEntity.setThreadId(message.thread_id);
        messageEntity.setReference(message.reference);
        messageEntity.setStatus(message.status);
        messageEntity.setSubject(message.subject);
        messageEntity.setAccount(message.account);
        messageEntity.setMessageBody(message.payload.body.data);

        if (message.document)
        {
            messageEntity.setDocumentData(message.document);
        }
        messageEntity.setNoReply(message.no_reply)
        messages.push(messageEntity);
    });
    return messages;

}

function buildRequest({status, 
    subject,
    message,
    requestUser = undefined, 
    requestAccount = undefined,
    payloadHeaders = undefined,
    threadID = undefined}) {

    return {
        secure_message: {
            subject: subject,
            user: requestUser,
            thread_id: threadID,
            account: requestAccount,
            payload: {
                body: {
                    data: message,
                },
                headers: payloadHeaders
            },
            status: status,
        }
    };
}


function buildRequestUser(name) {
    if (isNullOrUndefined(name)) {
        return undefined;
    }

    return {
        name: {
            ...name
        }
    };
}

function buildRequestAccount({id, number}) {

    if (isNullOrUndefined(id) && isNullOrUndefined(number)) {
        return undefined;
    }
    return {
        id, 
        number
    };
}

function buildHeaders({name, value})
{
    return [
        {
            name,
            value
        }
    ];
    
}

export function createNewMessage(data, status, name) {
    const requestUser = buildRequestUser(name);
    const requestAccount = buildRequestAccount(data)
    return buildRequest({...data, status, requestUser, requestAccount});
}

export function updateMessage(data, id, status) {
    const requestAccount = buildRequestAccount(data);
    const payloadHeaders = buildHeaders({name: "In-Reply-To", value: id});
    return buildRequest({...data, status, payloadHeaders, requestAccount});   
}

export function replyMessage(data, ids, status, name) {
    const requestUser = buildRequestUser(name);
    const requestAccount = buildRequestAccount(data);
    const payloadHeaders = buildHeaders({name: "In-Reply-To", value: ids.id});
    const threadID = isNullOrUndefined(ids.threadID) ? undefined : ids.threadID;
    return buildRequest({...data, status, threadID, requestUser, requestAccount, payloadHeaders});
}