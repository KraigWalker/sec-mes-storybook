/**
 * @class MessageEntity  Class for getter setter changes
 */
class MessageEntity {
    constructor() {
        this.account = null;
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
        return account;
    }
    /**
     * @returns message reference
     */
    getReference() {
        return reference;
    }
    /**
     * @return Date Of message
     */
    getDateCreated() {
        return dateCreated;
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
        return threadID;
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
        this.account = account;
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