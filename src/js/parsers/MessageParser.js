import _ from 'lodash';
import MessageEntity from '../entities/MessageEntity';
import { sortArrayByDate } from '../utils/DateUtils';

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

export function parseDraft(data, status) {
    if (data.id === undefined && data.number === undefined) {
        const requestData = {
            secure_message: {
                subject: data.subject,
                payload: {
                    body: {
                        data: data.message,
                    }
                },
                status: status,
            }
        }
        return requestData;
    } else {
        const requestData = {
            secure_message: {
                subject: data.subject,
                account: {
                    id: data.id,
                    number: data.number,
                },
                payload: {
                    body: {
                        data: data.message,
                    }
                },
                status: status,
            }
        }

        return requestData;
    }
}

export function updateMessage(data, id, status) {
    let requestData = {};
    if (data.id !== undefined) {
         requestData = {
            secure_message: {
                subject: data.subject,
                account: {
                    id: data.id,
                    number: data.number,
                },
                payload: {
                    headers: [
                        {
                            name: "In-Reply-To",
                            value: id,
                        }
                    ],
                    body: {
                        data: data.message,
                    }
                },
                status: status,
            }
        }

    } else {
      requestData = {
            secure_message: {
                subject: data.subject,

                payload: {
                    headers: [
                        {
                            name: "In-Reply-To",
                            value: id,
                        }
                    ],
                    body: {
                        data: data.message,
                    }
                },
                status: status,
            }
        }
    }
    return requestData;
}

export function deleteMessage(data, id, status) {
    let requestData = {};
    if (data.account.accountID !== undefined) {
        console.log('with account data');
         requestData = {
            secure_message: {
                subject: data.subject,
                account: {
                    id: data.account.accountID,
                    number: data.account.accountNumber,
                },
                payload: {
                    headers: [
                        {
                            name: "In-Reply-To",
                            value: id,
                        }
                    ],
                    body: {
                        data: data.message,
                    }
                },
                status: status,
            }
        }

    } else {
        console.log('without account data');
      requestData = {
            secure_message: {
                subject: data.subject,
                payload: {
                    headers: [
                        {
                            name: "In-Reply-To",
                            value: id,
                        }
                    ],
                    body: {
                        data: data.message,
                    }
                },
                status: status,
            }
        }
    }
    return requestData;
}
