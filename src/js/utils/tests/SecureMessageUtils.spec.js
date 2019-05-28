import { shallow } from 'enzyme';
import { getMessageType, updateMessageStatus, truncateText, truncateMessage } from '../SecureMessageUtils';
import TestData from '../../content/secureMessagesTestData.json'


describe('SecureMessage Utils Check:', () => {
  it('getMessageType - Should decide the message status belongs to INBOX or SENT list and return the same', () => {
    expect(getMessageType("SENT")).toEqual("SENT");
    expect(getMessageType("PENDING")).toEqual("SENT");
    expect(getMessageType("NEW")).toEqual("INBOX");
    expect(getMessageType("READ")).toEqual("INBOX");
  });
  it('updateMessageStatus - Should Update the status of the message in message object', () => {
      const Test1 = updateMessageStatus(TestData.securemessages[0], 'DRAFT');
      const Test2 = updateMessageStatus(TestData.securemessages[1], 'SENT');
      expect(Test1.status).toEqual("DRAFT");
      expect(Test2.status).toEqual("SENT");
  });
});

describe('Truncate text', () => {
  const TEXT_LIMIT = 20;
  it('has no spaces - just truncate based on provided length', () => {
    const text="zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz";
    const newText = truncateText(text, TEXT_LIMIT);
    expect(newText).toHaveLength(TEXT_LIMIT);
    expect(newText).toEqual("zzzzzzzzzzzzzzzzzzzz");
  });

  it('does not truncate a short message', () => {
    const TEXT_LIMIT = 20;
    const text="zzzzzzzzzz";
    const newText = truncateText(text, TEXT_LIMIT);
    expect(newText).toHaveLength(10);
    expect(newText).toEqual(text);
  });

  it('is empty - return empty string', () => {
    const text="";
    const newText = truncateText(text, TEXT_LIMIT);
    const newMessage = truncateMessage(newText);
    expect(newText).toHaveLength(0);
    expect(newText).toEqual(text);
    expect(newMessage).toHaveLength(0);
    expect(newMessage).toEqual(text);
  });

  it('is has a single space after the text limit', () => {
    const text="12345678901234567890 zzzzzzzzzzzzzzz";
    const newText = truncateText(text, TEXT_LIMIT);
    expect(newText).toHaveLength(TEXT_LIMIT);
    expect(newText).toEqual("12345678901234567890");
  });

  it('is has a single space 3 characters before the text limit', () => {
    const text="12345678901234567 890zzzzzzzzzzzzzzz";
    const newText = truncateText(text, TEXT_LIMIT);
    expect(newText).toHaveLength(17);
    expect(newText).toEqual("12345678901234567");
  });

  it('is has a single space 7 characters after the text limit', () => {
    const text="12345678901234567890123456 890";
    const newText = truncateText(text, TEXT_LIMIT);
    expect(newText).toHaveLength(26);
    expect(newText).toEqual("12345678901234567890123456");
  });

  it('has several spaces but space before limit is closer than space after', () => {
    const text="12345678901234567 901234 67890"
    const newText = truncateText(text, TEXT_LIMIT);
    expect(newText).toHaveLength(17);
    expect(newText).toEqual("12345678901234567");
  });

  it('has several spaces but space after limit is nearer than space before', () => {
    const text="12345678901234567 901 2345678"
    const newText = truncateText(text, TEXT_LIMIT);
    expect(newText).toHaveLength(21);
    expect(newText).toEqual("12345678901234567 901");
  });

  it('has several spaces - space before same distance as space after', () => {
    const text="12345678901234567 90123 45678"
    const newText = truncateText(text, TEXT_LIMIT);
    expect(newText).toHaveLength(23);
    expect(newText).toEqual("12345678901234567 90123");
  });

  it('has many spaces - break in the appropriate location', () => {
    const text="A new document is available for you to view, download and/or print in the Document library";
    const newText = truncateText(text, TEXT_LIMIT);
    expect(newText).toHaveLength(17);
    expect(newText).toEqual("A new document is");
  });

});

describe('Truncate message' , () => {
  const TEXT_LIMIT = 20;
  it('does not need truncated then no elipsis ( < limit)', () => {
    const text="12345678901234567"
    const newText = truncateMessage(text, TEXT_LIMIT);
    expect(newText).toHaveLength(17);
    expect(newText).toEqual("12345678901234567");
  });

  it('needs truncated then add elipsis appropriately', () => {
    const TEXT_LIMIT = 20;
    const text="12345678901234567 90123 45678";
    const newText = truncateMessage(text, TEXT_LIMIT);
    expect(newText).toHaveLength(26);
    expect(newText).toEqual("12345678901234567 90123...");
  });
})
