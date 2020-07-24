/**
 * @class AccountEntity  Class for getter setter changes
 */
class AccountEntity {
  constructor() {
    this.accountId = null;
    this.number = null;
    this.name = null;
  }
  /**
   * @param {String} status of the message
   */
  setId(accountId) {
    this.accountId = accountId;
  }
  /**
   * @param {String} status of the message
   */
  setAccountNumber(number) {
    this.number = number;
  }
  setAccountName(name) {
    this.name = name;
  }

  clone() {
    const newAccount = new AccountEntity();
    newAccount.accountId = this.accountId;
    newAccount.number = this.number;
    newAccount.name = this.name;
    return newAccount;
  }
}

export default AccountEntity;
