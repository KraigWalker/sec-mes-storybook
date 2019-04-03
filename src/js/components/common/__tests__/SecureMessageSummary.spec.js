
import React from 'react';
import { shallow, mount } from 'enzyme';
import { SecureMessageSummary } from '../SecureMessageSummary';

const setup = (setupProps) => {
  const props = {
    content: {
      back: 'Back',
      noSpecificAccount: 'noSpecificAccount'
    },
    messageDetail: {
      newMessageError: true,
      delSuccessModal: true,
    },
    message: {
      status: 'READ',
      getSubject: jest.fn(),
      getReference: jest.fn(),
      getMessageBody: jest.fn(),
      getDateCreated: jest.fn(),
      account: {
        number: '32236',
      }
    },
    messages: {
      draftError: true,
    },
    dispatch: jest.fn(),
    ...setupProps
  }
  const wrapper = shallow(<SecureMessageSummary {...props} />);
  return {
    wrapper,
    props
  }
}


describe("SecureMessageSummary snapshot", () => {
  const dispatch = jest.fn();
  const getSubject = jest.fn();
  const getReference = jest.fn();
  const getMessageBody = jest.fn();
  const getDateCreated = jest.fn();
  let props = {
    content: {
      back: 'Back',
      noSpecificAccount: 'noSpecificAccount'
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
      }
    },
    messages: {
      draftError: true,
    },
    dispatch: dispatch
  };
  let component = shallow(<SecureMessageSummary {...props} />);
  it('should match to snapshot', () => {
    expect(component).toMatchSnapshot();
  });
  describe("SecureMessageSummary snapshot", () => {
    const dispatch = jest.fn();
    const getSubject = jest.fn();
    const getReference = jest.fn();
    const getMessageBody = jest.fn();
    const getDateCreated = jest.fn();
    let props = {
      content: {
        back: 'Back',
        noSpecificAccount: 'noSpecificAccount'
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
        }
      },
      messages: {
        draftError: true,
      },
      dispatch: dispatch
    };
    let component = shallow(<SecureMessageSummary {...props} />);
    it('should match to snapshot', () => {
      expect(component).toMatchSnapshot();
    });
  });
  describe("SecureMessageSummary snapshot", () => {
    const dispatch = jest.fn();
    const getSubject = jest.fn();
    const getReference = jest.fn();
    const getMessageBody = jest.fn();
    const getDateCreated = jest.fn();
    let props = {
      content: {
        back: 'Back',
        noSpecificAccount: 'noSpecificAccount'
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
        }
      },
      messages: {
        draftError: true,
      },
      dispatch: dispatch
    };
    let component = shallow(<SecureMessageSummary {...props} />);
    it('should match to snapshot', () => {
      expect(component).toMatchSnapshot();
    });
  });
});