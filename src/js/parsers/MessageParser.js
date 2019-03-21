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
        messageEntity.setDocumentData({
            id: message.document_id,
            label: message.document_display_label
        });
        messageEntity.setNoReply(message.noreply)
        messages.push(messageEntity);
    });
    return messages;

}

export function parseDraft(data, status, name) {
    if (data.id === undefined || null && data.number === undefined || null) {
        const requestData = {
            secure_message: {
                subject: data.subject,
                user: {
                    name: {
                        title: name.title,
                        first_name: name.first_name,
                        middle_name: name.middle_name,
                        last_name: name.last_name
                    }
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
    } else {
        const requestData = {
            secure_message: {
                subject: data.subject,
                user: {
                    name: {
                        title: name.title,
                        first_name: name.first_name,
                        middle_name: name.middle_name,
                        last_name: name.last_name
                    }
                },
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
    if (data.account.accountId !== undefined || null) {
        requestData = {
            secure_message: {
                subject: data.subject,
                account: {
                    id: data.account.accountId,
                    number: data.account.number,
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

export function replyMessage(data, ids, status, name) {
    let requestData = {};
    switch (true) {
        case (data.id !== undefined && ids.threadID !== null):
            requestData = {
                secure_message: {
                    subject: data.subject,
                    user: {
                        name: {
                            title: name.title,
                            first_name: name.first_name,
                            middle_name: name.middle_name,
                            last_name: name.last_name
                        }
                    },
                    thread_id: ids.threadID,
                    account: {
                        id: data.id,
                        number: data.number,
                    },
                    payload: {
                        headers: [
                            {
                                name: "In-Reply-To",
                                value: ids.id,
                            }
                        ],
                        body: {
                            data: data.message,
                        }
                    },
                    status: status,
                }
            }
            break;
        case (data.id !== undefined && ids.threadID === null):
            requestData = {
                secure_message: {
                    subject: data.subject,
                    user: {
                        name: {
                            title: name.title,
                            first_name: name.first_name,
                            middle_name: name.middle_name,
                            last_name: name.last_name
                        }
                    },
                    account: {
                        id: data.id,
                        number: data.number,
                    },
                    payload: {
                        headers: [
                            {
                                name: "In-Reply-To",
                                value: ids.id,
                            }
                        ],
                        body: {
                            data: data.message,
                        }
                    },
                    status: status,
                }
            }
            break;
        case (data.id === undefined && ids.threadID !== null):
            requestData = {
                secure_message: {
                    subject: data.subject,
                    user: {
                        name: {
                            title: name.title,
                            first_name: name.first_name,
                            middle_name: name.middle_name,
                            last_name: name.last_name
                        }
                    },
                    thread_id: ids.threadID,
                    payload: {
                        headers: [
                            {
                                name: "In-Reply-To",
                                value: ids.id,
                            }
                        ],
                        body: {
                            data: data.message,
                        }
                    },
                    status: status,
                }
            }
            break;
        case (data.id === undefined && ids.threadID === null):
            requestData = {
                secure_message: {
                    subject: data.subject,
                    user: {
                        name: {
                            title: name.title,
                            first_name: name.first_name,
                            middle_name: name.middle_name,
                            last_name: name.last_name
                        }
                    },
                    payload: {
                        headers: [
                            {
                                name: "In-Reply-To",
                                value: ids.id,
                            }
                        ],
                        body: {
                            data: data.message,
                        }
                    },
                    status: status,
                }
            }
            break;
        default:
    }
    return requestData;
}