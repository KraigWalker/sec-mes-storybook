import AccountEntity from './AccountEntity';

/**
 * @class MessageEntity  Class for getter setter changes
 */
class MessageEntity {
    constructor() {
        this.account = new AccountEntity();
        this.reference = null;
        this.dateCreated = null;
        this.status = null;
        this.threadID = null;
        this.subject = null;
        this.messageBody = null;
    }
    /**
     * @returns account mapped to message
     */
    getAccount() {
        return this.account;
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
        return this.messageBody;
    }
    /**
     * 
     * @param {Object} Account Entity related to the message
     */
    setAccount(account) {
        this.account.setId(account.id);
        this.account.setAccountNumber(account.number);
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
        this.dateCreated = date;
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
        this.messageBody = message
    }

}

export default MessageEntity;