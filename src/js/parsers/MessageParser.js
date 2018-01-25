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

export function parseDraft(data) {
    const requestData = {
        secure_message: {
            subject: data.subject,
            account: {
                id: 'ddec9b5e-d6d8-430a-9c3a-19a281318fe6',
                number: '822000-12341234',
            },
            payload: {
                body: {
                    data: data.message,
                }
            },
            status: data.status,
        }
    }
    return requestData;
}


export function updateMessage(data, id) {
    console.log(data);
    const requestData = {
            secure_message: {
                subject: data.subject,
                account: {
                    id: 'ddec9b5e-d6d8-430a-9c3a-19a281318fe6',
                    number: '822000-12341234'
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
                status: data.status,
            }
    }
    return requestData;
}

// {
//     "secure_message": {
//       "subject": "Payment Enquiries",
//       "account": {
//         "id": "$UUID",
//         "number": "$SORT_CODE-$ACCOUNT_NUMBER"
//       },
//       "payload": {
//         "headers": [
//           {
//             "name": "In-Reply-To",
//             "value": "$UUID"
//           }
//         ],
//         "body": {
//           "data": "Dear Advsior, thank you for contacting me about my account. blah blah blah ..."
//         }
//       },
//       "status": "PENDING"
//     }
//   }