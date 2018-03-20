
class MessageAccountEntity {
    constructor() {
            this.accounts = [];
    }
    setAccounts(account) {
        this.accounts.push({"name":account.product.name,"number":account.number, "accountId": account.id, "display_order": account.metadata.display_order});
    }
    getAccounts() {
        return _.sortBy(this.accounts, ['display_order']);
    }
}
export default MessageAccountEntity;