/**
 * @class SendMessageRequestEntity  Class for getter setter changes
 */
class SendMessageRequestEntity {
    constructor() {
        this.messageRequestObject = {};
    }
    setSubject(subject) {
        this.messageRequestObject.subject = subject.value;
    }
    setAccount(data) {
        this.messageRequestObject.name = data.name;
        this.messageRequestObject.number = data.number;
        this.messageRequestObject.id = data.accountId;
    }
    setUpdateSubject(subject) {
        this.messageRequestObject.subject = subject;
    }
    setMessage(message) {
        this.messageRequestObject.message = message;
    }

    getMessageRequestData() {
        return this.messageRequestObject;
    }
    setName(name) {
        this.messageRequestObject.name = name;
    }
    setAccountNumber(number) {
        this.messageRequestObject.number  = number;
    }
    setAccountId(id) {
        this.messageRequestObject.id = id;
    }
    getAccountNumber() {
        return this.messageRequestObject.number;
    }

}
export default SendMessageRequestEntity;