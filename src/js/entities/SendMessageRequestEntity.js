/**
 * @class SendMessageRequestEntity  Class for getter setter changes
 */
class SendMessageRequestEntity {
    constructor() {
        this.messageRequestObject = {
            subject : '',
            account : '',
            message : '',
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
    getMessageRequestData() {
        return this.messageRequestObject;
    }

}
export default SendMessageRequestEntity;