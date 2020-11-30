import { SecureMessageBL, getThreadsBL } from '../SecureMessageBL';
import TestData from '../../content/secureMessagesTestData.json';
import {
  NEW,
  ARCHIVED,
  SENT,
  PENDING,
  READ,
  DRAFT,
} from '../../constants/StringsConstants';
import MessageEntity from '../../entities/MessageEntity';
import AccountEntity from '../../entities/AccountEntity';

const BuildMessageEntity = (message) => {
  const newMessage = new MessageEntity();
  newMessage.setDocumentData({
    id: '1234',
    label: 'Doc1',
    fileSize: '567',
  });
  newMessage.setId(message.id);
  newMessage.setStatus(message.status);

  const account = new AccountEntity();
  account.setAccountName('acc1');
  account.setAccountNumber('12345');
  account.setId('1234');

  newMessage.setAccount(account);
  return newMessage;
};

const BuildMessageEntities = (messages) => messages.map(BuildMessageEntity);

describe('Business Logic Check:', () => {
  it('getISODateString - Should return Inbox, Drafts and Sent Arrays (3 different arrayas in object Status of "NEW" AND "READ" will go under Inbox, Status of "PENDING" AND "SENT" will go under Sent and  Status of "DRAFT" will go under Draft )', () => {
    const SortedArray = SecureMessageBL({ messages: TestData.secure_messages });
    expect(SortedArray.inboxMessages).toHaveLength(2);
    expect(SortedArray.sentMessages).toHaveLength(2);
    expect(SortedArray.draftMessages).toHaveLength(1);
  });
  it('getThreadsBL - Should return all matching', () => {
    const Test1 = getThreadsBL({
      messages: TestData.getThreadsBL,
      currentMessage: TestData.getThreadsBL[4],
    });
    const Test2 = getThreadsBL({
      messages: TestData.getThreadsBL,
      currentMessage: TestData.getThreadsBL[1],
    });
    expect(Test1[0].threadID).toEqual(TestData.getThreadsBL[4].threadID);
    expect(Test1[0].id).toEqual('3');
    expect(Test2[0].threadID).toEqual(TestData.getThreadsBL[1].threadID);
    expect(Test2[0].id).toEqual('1');
  });

  describe('SecureMessageBL grouping tests', () => {
    //4 archived, 1 new, 1 read, 1 sent, 1 pending, 1 draft

    const initialMessages = BuildMessageEntities([
      {
        id: 'C12345',
        status: NEW,
      },
      {
        id: 'C56789',
        status: READ,
      },
      {
        id: 'C11111',
        status: ARCHIVED,
      },
      {
        id: 'C22222',
        status: ARCHIVED,
      },
      {
        id: 'C33333',
        status: ARCHIVED,
      },
      {
        id: 'C33334',
        status: ARCHIVED,
      },
      {
        id: 'C99999',
        status: SENT,
      },
      {
        id: 'C88888',
        status: PENDING,
      },
      {
        id: 'C88889',
        status: DRAFT,
      },
    ]);

    describe('Messages only, no deleting / archiving / unarchiving records', () => {
      const result = SecureMessageBL({
        messages: initialMessages,
      });

      it('should have 2 inbox messages', () => {
        expect(result.inboxMessages).toEqual(
          BuildMessageEntities([
            {
              id: 'C12345',
              status: NEW,
            },
            {
              id: 'C56789',
              status: READ,
            },
          ])
        );
      });

      it('should have 4 archived messages', () => {
        expect(result.archivedMessages).toEqual(
          BuildMessageEntities([
            {
              id: 'C11111',
              status: ARCHIVED,
            },
            {
              id: 'C22222',
              status: ARCHIVED,
            },
            {
              id: 'C33333',
              status: ARCHIVED,
            },
            {
              id: 'C33334',
              status: ARCHIVED,
            },
          ])
        );
      });

      it('should have 2 sent messages', () => {
        expect(result.sentMessages).toEqual(
          BuildMessageEntities([
            {
              id: 'C99999',
              status: SENT,
            },
            {
              id: 'C88888',
              status: PENDING,
            },
          ])
        );
      });

      it('should have 1 draft message', () => {
        expect(result.draftMessages).toEqual(
          BuildMessageEntities([
            {
              id: 'C88889',
              status: DRAFT,
            },
          ])
        );
      });
    });

    describe('Some records mark as deleted, should be reflected in message categories', () => {
      const result = SecureMessageBL({
        messages: initialMessages,
        deletingMessages: ['C12345', 'C22222', 'C88888', 'C88889'],
      });

      it('should have 1 inbox message', () => {
        expect(result.inboxMessages).toEqual(
          BuildMessageEntities([
            {
              id: 'C56789',
              status: READ,
            },
          ])
        );
      });

      it('should have 3 archived messages', () => {
        expect(result.archivedMessages).toEqual(
          BuildMessageEntities([
            {
              id: 'C11111',
              status: ARCHIVED,
            },
            {
              id: 'C33333',
              status: ARCHIVED,
            },
            {
              id: 'C33334',
              status: ARCHIVED,
            },
          ])
        );
      });

      it('should have 1 sent message', () => {
        expect(result.sentMessages).toEqual(
          BuildMessageEntities([
            {
              id: 'C99999',
              status: SENT,
            },
          ])
        );
      });

      it('should have 0 draft messages', () => {
        expect(result.draftMessages).toEqual([]);
      });
    });

    describe('Deleting messages, archiving messages & unarchiving messages', () => {
      const result = SecureMessageBL({
        messages: initialMessages,
        deletingMessages: ['C22222', 'C88888'],
        archivingMessages: ['C56789'],
        unarchivingMessages: ['C33334'],
        readingMessages: ['C12345'],
      });

      it('should have 2 inbox messages', () => {
        expect(result.inboxMessages).toEqual(
          BuildMessageEntities([
            {
              id: 'C12345',
              status: READ,
            },
            {
              id: 'C33334',
              status: READ,
            },
          ])
        );
      });

      it('should have 3 archived messages', () => {
        expect(result.archivedMessages).toEqual(
          BuildMessageEntities([
            {
              id: 'C56789',
              status: ARCHIVED,
            },
            {
              id: 'C11111',
              status: ARCHIVED,
            },
            {
              id: 'C33333',
              status: ARCHIVED,
            },
          ])
        );
      });

      it('should have 1 sent message', () => {
        expect(result.sentMessages).toEqual(
          BuildMessageEntities([
            {
              id: 'C99999',
              status: SENT,
            },
          ])
        );
      });

      it('should have 1 draft message', () => {
        expect(result.draftMessages).toEqual(
          BuildMessageEntities([
            {
              id: 'C88889',
              status: DRAFT,
            },
          ])
        );
      });
    });
  });
});
