/**
 * @class SendMessageRequestEntity  Class for getter setter changes
 */
class SendMessageRequestEntity {
  constructor() {
    this.messageRequestObject = {
      account: {
        accountId: undefined,
        number: undefined,
      },
    };
  }
  setSubject(subject) {
    this.messageRequestObject.subject = subject.value;
  }
  setAccount(data) {
    this.messageRequestObject.name = data.name;
    this.messageRequestObject.account = {
      number: data.number,
      accountId: data.accountId,
    };
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
    this.messageRequestObject.account.number = number;
  }
  setAccountId(id) {
    this.messageRequestObject.account.accountId = id;
  }
  getAccountNumber() {
    return this.messageRequestObject.number;
  }
}
export default SendMessageRequestEntity;
