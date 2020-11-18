import { sortBy } from 'lodash-es';

class MessageAccountEntity {
  constructor() {
    this.accounts = [];
  }
  setAccounts(account) {
    this.accounts.push({
      name: account.product.name,
      number: account.number,
      accountId: account.id,
      display_order: account.metadata.display_order,
      display_name: account.metadata.display_name,
    });
  }
  getAccounts() {
    return sortBy(this.accounts, ['display_order']);
  }
}
export default MessageAccountEntity;
