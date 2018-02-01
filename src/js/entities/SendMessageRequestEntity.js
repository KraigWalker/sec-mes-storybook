/**
 * @class SendMessageRequestEntity  Class for getter setter changes
 */
class SendMessageRequestEntity {
    constructor() {
        this.messageRequestObject = {
            subject : '',
            account : '',
            message : '',
            status : '',
        };
        
    }
    setSubject(subject) {
        this.messageRequestObject.subject = subject;
    }
    setAccount(account) {
        this.messageRequestObject.account = account;
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