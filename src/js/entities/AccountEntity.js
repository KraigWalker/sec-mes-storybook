/**
 * @class AccountEntity  Class for getter setter changes
 */
class AccountEntity {
    constructor() {
        this.id = null;
        this.accountNumber = null;
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
}

export default AccountEntity;