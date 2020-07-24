import { createNewMessage, updateExistingMessage } from '../MessageParser';
import { DRAFT } from '../../constants/StringsConstants';

const name = {
  title: 'Mr',
  first_name: 'Jolly',
  middle_name: 'P',
  last_name: 'Ants',
};

describe('createNewMessage Tests', () => {
  let data;
  beforeEach(() => {
    data = {
      subject: 'Technical Support',
      message: 'Some simple message text',
      account: {
        id: undefined,
        number: undefined,
      },
    };
  });

  it('when there is no account then the message should have undefined account', () => {
    const message = createNewMessage({
      data,
      status: DRAFT,
      name,
    });
    expect(message.account).toBe(undefined);
  });

  it('when there is an account then the message should contain the account details', () => {
    data.account = {
      number: '12345',
      accountId: '98765',
    };
    const message = createNewMessage({
      data,
      status: DRAFT,
      name,
    });
    const expectedMessage = {
      secure_message: {
        subject: data.subject,
        user: {
          name: {
            title: name.title,
            first_name: name.first_name,
            middle_name: name.middle_name,
            last_name: name.last_name,
          },
        },
        thread_id: undefined,
        account: {
          number: data.account.number,
          id: data.account.accountId,
        },
        payload: {
          body: {
            data: data.message,
          },
          headers: undefined,
        },
        status: DRAFT,
      },
    };
    expect(message).toEqual(expectedMessage);
  });

  it('when there is no name then the user should be undefined', () => {
    const message = createNewMessage({
      data,
      status: DRAFT,
    });
    expect(message.user).toBe(undefined);
  });
});

describe('update existing message tests', () => {
  let data;
  beforeEach(() => {
    data = {
      id: 'C0122455',
      subject: 'Technical Support',
      message: 'Some simple message text',
      account: {
        number: undefined,
        accountId: undefined,
      },
    };
  });

  it('has no-reply-to header with message id', () => {
    const message = updateExistingMessage({
      data,
      status: DRAFT,
    });
    const expectedMessage = {
      secure_message: {
        subject: data.subject,
        thread_id: undefined,
        account: undefined,
        payload: {
          body: {
            data: data.message,
          },
          headers: [
            {
              name: 'In-Reply-To',
              value: 'C0122455',
            },
          ],
        },
        user: undefined,
        status: DRAFT,
      },
    };

    expect(message).toEqual(expectedMessage);
  });

  it('has no account then no account specified', () => {
    const message = updateExistingMessage({
      data,
      status: DRAFT,
    });
    expect(message.account).toBe(undefined);
  });

  it('has account then message has account detail', () => {
    data.account = {
      number: '123456',
      accountId: '00212',
    };
    const message = updateExistingMessage({
      data,
      status: DRAFT,
    });
    const expectedMessage = {
      secure_message: {
        subject: data.subject,
        thread_id: undefined,
        account: {
          id: data.account.accountId,
          number: data.account.number,
        },
        payload: {
          body: {
            data: data.message,
          },
          headers: [
            {
              name: 'In-Reply-To',
              value: 'C0122455',
            },
          ],
        },
        user: undefined,
        status: DRAFT,
      },
    };
    expect(message).toEqual(expectedMessage);
  });
});

describe('reply tests', () => {
  let data;
  beforeEach(() => {
    data = {
      subject: 'Technical Support',
      message: 'Some simple message text',
      account: {
        number: undefined,
        id: undefined,
      },
    };
  });

  it('has no name then user should be undefined', () => {
    const message = createNewMessage({
      data,
      ids: { id: 'C0122455', threadID: '12345' },
      status: DRAFT,
      name,
    });
    expect(message.user).toBe(undefined);
  });

  it('has no account then user should be undefined', () => {
    const message = createNewMessage({ data, ids: { id: 'C0122455', threadID: '12345' }, status: DRAFT, name });
    expect(message.account).toBe(undefined);
  });

  it('has no threadID then threadID should be undefined', () => {
    const message = createNewMessage({
      data,
      ids: { id: 'C0122455', threadID: null },
      status: DRAFT,
      name,
    });
    expect(message.threadID).toBe(undefined);
  });

  it('with account, name & threadID then the message appears correctly', () => {
    data.account = {
      number: '123456',
      accountId: '00212',
    };

    const message = createNewMessage({
      data,
      ids: { id: 'C0122455', threadID: '98765' },
      status: DRAFT,
      name,
    });
    const expectedMessage = {
      secure_message: {
        subject: data.subject,
        thread_id: '98765',
        account: {
          id: data.account.accountId,
          number: data.account.number,
        },
        payload: {
          body: {
            data: data.message,
          },
          headers: [
            {
              name: 'In-Reply-To',
              value: 'C0122455',
            },
          ],
        },
        user: {
          name: {
            title: name.title,
            first_name: name.first_name,
            middle_name: name.middle_name,
            last_name: name.last_name,
          },
        },
        status: DRAFT,
      },
    };
    expect(message).toEqual(expectedMessage);
  });
});
