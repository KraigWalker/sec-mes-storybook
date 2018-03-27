import { expect } from 'chai';
import { shallow } from 'enzyme';
import { getMessageType, updateMessageStatus } from '../SecureMessageUtils';
import TestData from '../../content/secureMessagesTestData.json'


describe('SecureMessage Utils Check:', () => {
  it('getMessageType - Should decide the message status belongs to INBOX or SENT list and return the same', () => {
    expect(getMessageType("SENT")).to.eql("sent");
    expect(getMessageType("PENDING")).to.eql("sent");
    expect(getMessageType("NEW")).to.eql("inbox");
    expect(getMessageType("READ")).to.eql("inbox");
  });
  it('updateMessageStatus - Should Update the status of the message in message object', () => {
      const Test1 = updateMessageStatus(TestData.securemessages[0], 'DRAFT');
      const Test2 = updateMessageStatus(TestData.securemessages[1], 'SENT');
      expect(Test1.status).to.eql("DRAFT");
      expect(Test2.status).to.eql("SENT");
  });
});