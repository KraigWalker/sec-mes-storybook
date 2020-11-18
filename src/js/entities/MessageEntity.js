import AccountEntity from './AccountEntity';
import {
  getFriendlyDate,
  isUnixDate,
  getFriendlyDateFromUnix,
} from '../utils/DateUtils';

/**
 * @class MessageEntity  Class for getter setter changes
 */
class MessageEntity {
  constructor() {
    this.id = null;
    this.account = new AccountEntity();
    this.category = null;
    this.reference = null;
    this.dateCreated = null;
    this.status = null;
    this.threadID = null;
    this.subject = null;
    this.message = null;
    this.document = null;
    this.noReply = false;
  }
  /**
   * @returns account mapped to message
   */
  getId() {
    return this.id;
  }
  /**
   * @returns account mapped to message
   */
  getAccount() {
    return this.account;
  }

  /**
   * @returns category field of the message ("Letters", "Statements" etc.)
   */
  getCategory() {
    return this.category;
  }

  /**
   * @returns message reference
   */
  getReference() {
    return this.reference;
  }
  /**
   * @return Date Of message
   */
  getDateCreated() {
    return this.dateCreated;
  }
  /**
   * @return status
   */
  getStatus() {
    return this.status;
  }
  /**
   * @return threadID
   */
  getThreadID() {
    return this.threadID;
  }
  /**
   * @return subject of the message
   */
  getSubject() {
    return this.subject;
  }
  /**
   * @return message body
   */

  getMessageBody() {
    return this.message;
  }
  /**
   *
   * @param {String} reference of the secure message
   */
  setId(id) {
    this.id = id;
  }
  /**
   *
   * @param {Object} account Entity related to the message
   */
  setAccount(account) {
    if (account === null || account === undefined) {
      this.account.setId();
      this.account.setAccountNumber();
    } else {
      this.account.setId(account.id);
      this.account.setAccountNumber(account.number);
    }
  }

  /**
   * @param {String} category The category of the secure message attachment
   */
  setCategory(category) {
    this.category = category;
  }

  /**
   *
   * @param {String} reference of the secure message
   */
  setReference(reference) {
    this.reference = reference;
  }
  /**
   *
   * @param {*} date
   */
  setDateCreated(date) {
    if (isUnixDate(date)) {
      this.dateCreated = getFriendlyDateFromUnix(date);
    } else {
      this.dateCreated = getFriendlyDate(date);
    }
  }

  /**
   *
   * @param {String} status of the message
   */
  setStatus(status) {
    this.status = status;
  }
  /**
   *
   * @param {*} Thread Id to link messages
   */
  setThreadId(id) {
    this.threadID = id;
  }
  /**
   *
   * @param {*} subject of the message
   */
  setSubject(subject) {
    this.subject = subject;
  }
  /**
   *
   * @param {*} message body
   */
  setMessageBody(message) {
    this.message = message;
  }

  setDocumentData(document) {
    this.document = {
      id: document.id,
      label: document.display_label,
      fileSize: document.file_size,
    };
  }

  setNoReply(noReply) {
    this.noReply = noReply;
  }

  clone() {
    const newMessage = new MessageEntity();
    newMessage.id = this.id;
    newMessage.reference = this.reference;
    newMessage.dateCreated = this.dateCreated;
    newMessage.status = this.status;
    newMessage.category = this.category;
    newMessage.threadID = this.threadID;
    newMessage.subject = this.subject;
    newMessage.message = this.message;
    newMessage.noReply = this.noReply;

    if (this.document) {
      const { id, label, fileSize } = this.document;
      newMessage.document = {
        id,
        label,
        fileSize,
      };
    }
    if (this.account) {
      newMessage.account = this.account.clone();
    }
    return newMessage;
  }

  cloneWithUpdatedStatus(status) {
    const newMessage = this.clone();
    newMessage.status = status;
    return newMessage;
  }
}

export default MessageEntity;
