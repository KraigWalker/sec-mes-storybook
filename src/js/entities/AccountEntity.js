/**
 * @class AccountEntity  Class for getter setter changes
 */
class AccountEntity {
    constructor() {
        this.id = null;
        this.accountNumber = null;
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
    setId(id) {
        this.id = id;
    }
    /**
     * 
     * @param {String} status of the message
     */
    setAccountNumber(accountNumber) {
        this.accountNumber = accountNumber;
    }
    setAccountName(name) {
        this.name =name;
    }
    getAccountName() {
        return this.name;
    }
}

export default AccountEntity;