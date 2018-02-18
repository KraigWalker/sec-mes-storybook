/**
 * @class SendMessageRequestEntity  Class for getter setter changes
 */
class SendMessageRequestEntity {
    constructor() {
        this.messageRequestObject = {};
    }
    setSubject(subject) {
        this.messageRequestObject.subject = subject;
    }
    setAccount(account) {
        let acc = account;
        let accNumber = {};
        let accId = {};
        accNumber = acc.split('&')[1];
        accId = acc.split('&')[0];
        this.messageRequestObject.accountNumber = accNumber;
        this.messageRequestObject.accountID = accId;
    }
    setUpdateAccount(account) {
        this.messageRequestObject.accountNumber = account.accountNumber;
        this.messageRequestObject.accountID = account.accountID;
    }
    setMessage(message) {
        this.messageRequestObject.message = message;
    }
    setStatus(status) {
        this.messageRequestObject.status = status;
    }
    getMessageRequestData() {
        return this.messageRequestObject;
    }

}
export default SendMessageRequestEntity;