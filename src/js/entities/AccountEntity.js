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
     * @returns account mapped to message
     */
    getId() {
        return account;
    }
    /**
     * @returns account mapped to message
     */
    getAccountNumber() {
        return account;
    }
    /**
     * 
     * @param {String} status of the message
     */
    setId(accountId) {
        this.accountId = accountId;
    }
    /**
     * 
     * @param {String} status of the message
     */
    setAccountNumber(number) {
        this.number = number;
    }
    setAccountName(name) {
        this.name =name;
    }
    getAccountName() {
        return this.name;
    }
}

export default AccountEntity;