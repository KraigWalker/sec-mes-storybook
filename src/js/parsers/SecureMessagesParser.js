
import _ from 'lodash';


class SecureMessagesParser {

  mapSecureMessages(data) {
    let inboxMessage = [];
    let draftMessage = [];
    let sentMessage = [];
    _.map(data.securemessages, (item, index) => {
      switch (item.status) {
        case 'NEW': inboxMessage.push(item);
        break;
        case 'DRAFT': draftMessage.push(item);
        break;
        case 'PENDING': sentMessage.push(item);
        break;
      }
      
    });
    return {inboxMessage, draftMessage, sentMessage};
}
}
export default new SecureMessagesParser();
