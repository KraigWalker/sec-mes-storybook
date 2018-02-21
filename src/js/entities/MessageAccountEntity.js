
class MessageAccountEntity {
    constructor() {
            this.accounts = [];
    }
    setAccounts(account) {
        this.accounts.push({"name":account.product.name,"number":account.number, "accountId": account.id});
    }
    getAccounts() {
        return this.accounts;
    }
}
export default MessageAccountEntity;