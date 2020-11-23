import MessageEntity from '../entities/MessageEntity';
import { sortArrayByDate } from '../utils/DateUtils';
import { isNullOrUndefined } from '../utils/GeneralUtils';

/**
 *
 * @param {array of Messages} parses the service response
 */
export function parseMessages(response) {
  console.log('parse message response');
  console.dir(response);
  const sortedMessages = sortArrayByDate(response.secure_messages);
  return sortedMessages.map((message) => {
    const messageEntity = new MessageEntity();
    messageEntity.setId(message.id);
    if (message.category) {
      console.log('category found:' + message.category);
      messageEntity.setCategory(message.category);
    }
    messageEntity.setDateCreated(message.date_created);
    messageEntity.setThreadId(message.thread_id);
    messageEntity.setReference(message.reference);
    messageEntity.setStatus(message.status);
    messageEntity.setSubject(message.subject);
    messageEntity.setAccount(message.account);
    messageEntity.setMessageBody(message.payload.body.data);

    if (message.document) {
      if (message.document.category) {
        console.log('category found in document:' + message.document.category);
        messageEntity.setCategory(message.document.category);
      }
      messageEntity.setDocumentData(message.document);
    }
    messageEntity.setNoReply(message.no_reply);

    return messageEntity;
  });
}

function buildRequest({
  status,
  subject,
  message,
  requestUser = undefined,
  requestAccount = undefined,
  payloadHeaders = undefined,
  threadID = undefined,
}) {
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
        headers: payloadHeaders,
      },
      status: status,
    },
  };
}

function buildRequestUser(name) {
  if (isNullOrUndefined(name)) {
    return undefined;
  }

  return {
    name: {
      ...name,
    },
  };
}

function buildRequestAccount({ accountId, number }) {
  if (isNullOrUndefined(accountId) && isNullOrUndefined(number)) {
    return undefined;
  }
  return {
    id: accountId,
    number,
  };
}

const buildHeaders = ({ name, value }) => [{ name, value }];

export function createNewMessage({ data, status, name, ids }) {
  const requestUser = buildRequestUser(name);
  const requestAccount = buildRequestAccount(data.account);

  const payloadHeaders = ids
    ? buildHeaders({ name: 'In-Reply-To', value: ids.id })
    : undefined;

  let threadID;
  if (ids) {
    threadID = isNullOrUndefined(ids.threadID) ? undefined : ids.threadID;
  }

  return buildRequest({
    ...data,
    status,
    threadID,
    requestUser,
    requestAccount,
    payloadHeaders,
  });
}

export function updateExistingMessage({ data, status }) {
  const requestAccount = buildRequestAccount(data.account);
  const payloadHeaders = buildHeaders({ name: 'In-Reply-To', value: data.id });
  return buildRequest({ ...data, status, payloadHeaders, requestAccount });
}
