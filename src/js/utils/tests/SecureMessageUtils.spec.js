import { shallow } from 'enzyme';
import { getMessageType, updateMessageStatus } from '../SecureMessageUtils';
import TestData from '../../content/secureMessagesTestData.json'


describe('SecureMessage Utils Check:', () => {
  it('getMessageType - Should decide the message status belongs to INBOX or SENT list and return the same', () => {
    expect(getMessageType("SENT")).toEqual("sent");
    expect(getMessageType("PENDING")).toEqual("sent");
    expect(getMessageType("NEW")).toEqual("inbox");
    expect(getMessageType("READ")).toEqual("inbox");
  });
  it('updateMessageStatus - Should Update the status of the message in message object', () => {
      const Test1 = updateMessageStatus(TestData.securemessages[0], 'DRAFT');
      const Test2 = updateMessageStatus(TestData.securemessages[1], 'SENT');
      expect(Test1.status).toEqual("DRAFT");
      expect(Test2.status).toEqual("SENT");
  });
});