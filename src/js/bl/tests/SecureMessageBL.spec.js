import { expect } from 'chai';
import { shallow } from 'enzyme';
import { SecureMessageBL, getThreadsBL } from '../SecureMessageBL';
import TestData from '../../content/secureMessagesTestData.json'

describe('Business Logic Check:', () => {
    it('getISODateString - Should return Inbox, Drafts and Sent Arrays (3 different arrayas in object Status of "NEW" AND "READ" will go under Inbox, Status of "PENDING" AND "SENT" will go under Sent and  Status of "DRAFT" will go under Draft )', () => {
      const SortedArray = SecureMessageBL({"messages":TestData.securemessages});
      // console.log(SortedArray);
      expect(SortedArray.inboxMessages).to.have.length(2);
      expect(SortedArray.sentMessages).to.have.length(2);
      expect(SortedArray.draftMessages).to.have.length(1);
    });
    it('getThreadsBL - Should return all matching', () => {
      const Test1 = getThreadsBL(TestData.getThreadsBL, TestData.getThreadsBL[4]);
      const Test2 = getThreadsBL(TestData.getThreadsBL, TestData.getThreadsBL[1]);
      expect(Test1[0].threadID).to.eql(TestData.getThreadsBL[4].threadID);
      expect(Test1[0].id).to.eql('3');
      expect(Test2[0].threadID).to.eql(TestData.getThreadsBL[1].threadID);
      expect(Test2[0].id).to.eql('1');
    });
  });