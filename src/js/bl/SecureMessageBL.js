import _ from  'lodash';
import MessageEntity from '../entities/MessageEntity';
import moment from 'moment';

/**
 * 
 * @param {array of Messages} parses all messages and creates 3 different arrays for INBOX/DRAFT/SENT.
 */

export function SecureMessageBL(response) {
  
    const inboxMessages = [];
    const sentMessages = [];
    const draftMessages = [];
    _.map(response.messages, message => {
        switch (message.status){
            case "NEW":
            case "READ":
                inboxMessages.push(message);
            break;
            case "DRAFT":
                draftMessages.push(message);
            break;
            case "PENDING":
            case "SENT":
                sentMessages.push(message);
            break;
            
        }
    });
    return {inboxMessages,sentMessages,draftMessages};
}
    /**
     * to fetch all related threads on the cureent message.
     * @param {array} messages //total list of secure messages.
     * @param {object} currentMessage //current message.
     */
    export function getThreadsBL(messages, currentMessage) {
        // Enable it for LOG. ---- messages.filter(message => console.log("old date: "+message.dateCreated+" current date: "+currentMessage.dateCreated+" Condition: "+moment(moment(message.dateCreated, "DD-MM-YYYY")).isBefore(moment(currentMessage.dateCreated, "DD-MM-YYYY"))) );
        return messages.filter(message => message.threadID === currentMessage.threadID && moment(message.dateCreated, "DD-MM-YYYY").isBefore(moment(currentMessage.dateCreated, "DD-MM-YYYY")));
        
    }

 // Code for adding accounts name in draft
    export function getAccountName(id, accountData) {
        if(id === undefined){
            return 'No specific account';
        }
        else
        return _.find(accountData.accounts, function(accData) { 
            if(accData.accountId === id) {
                const name = accData.display_name || accData.name;
                return name;
            }
        });
    }