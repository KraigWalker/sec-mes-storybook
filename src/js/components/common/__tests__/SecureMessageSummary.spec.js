import { shallow } from 'enzyme';
import { SecureMessageSummary } from '../SecureMessageSummary';

describe('SecureMessageSummary snapshot', () => {
  const dispatch = jest.fn();
  const getSubject = jest.fn();
  const getReference = jest.fn();
  const getMessageBody = jest.fn();
  const getDateCreated = jest.fn();
  let props = {
    content: {
      back: 'Back',
      noSpecificAccount: 'noSpecificAccount',
    },
    viewMessageFlag: true,
    messageDetail: {
      newMessageError: true,
      delSuccessModal: true,
    },
    message: {
      status: 'NEW',
      getSubject: getSubject,
      getReference: getReference,
      getMessageBody: getMessageBody,
      getDateCreated: getDateCreated,
      account: {
        number: '32236',
      },
      message: 'Hello there',
    },
    messages: {
      draftError: true,
    },
    dispatch: dispatch,
  };
  let component = shallow(<SecureMessageSummary {...props} />);
  it('should match to snapshot', () => {
    expect(component).toMatchSnapshot();
  });
  describe('SecureMessageSummary snapshot', () => {
    const dispatch = jest.fn();
    const getSubject = jest.fn();
    const getReference = jest.fn();
    const getMessageBody = jest.fn();
    const getDateCreated = jest.fn();
    let props = {
      content: {
        back: 'Back',
        noSpecificAccount: 'noSpecificAccount',
      },
      messageDetail: {
        newMessageError: true,
        delSuccessModal: true,
      },
      message: {
        status: 'READ',
        getSubject: getSubject,
        getReference: getReference,
        getMessageBody: getMessageBody,
        getDateCreated: getDateCreated,
        account: {
          number: '32236',
        },
        message: 'Hello there',
      },
      messages: {
        draftError: true,
      },
      dispatch: dispatch,
    };
    let component = shallow(<SecureMessageSummary {...props} />);
    it('should match to snapshot', () => {
      expect(component).toMatchSnapshot();
    });
  });
  describe('SecureMessageSummary snapshot', () => {
    const dispatch = jest.fn();
    const getSubject = jest.fn();
    const getReference = jest.fn();
    const getMessageBody = jest.fn();
    const getDateCreated = jest.fn();
    let props = {
      content: {
        back: 'Back',
        noSpecificAccount: 'noSpecificAccount',
      },
      messageDetail: {
        newMessageError: true,
        delSuccessModal: true,
      },
      message: {
        status: 'DRAFT',
        getSubject: getSubject,
        getReference: getReference,
        getMessageBody: getMessageBody,
        getDateCreated: getDateCreated,
        account: {
          number: undefined,
        },
        message: 'Hello there',
      },
      messages: {
        draftError: true,
      },
      dispatch: dispatch,
    };
    let component = shallow(<SecureMessageSummary {...props} />);
    it('should match to snapshot', () => {
      expect(component).toMatchSnapshot();
    });
  });
});
