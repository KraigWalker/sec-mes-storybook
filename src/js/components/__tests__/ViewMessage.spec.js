import React from 'react';
import { ViewMessage } from '../ViewMessage';
import { shallow } from 'enzyme';
jest.mock('../../bl/SecureMessageBL');

/** @todo kill these flakey snapshot tests */

describe.skip('View Message snapshot', () => {
  const dispatch = jest.fn();
  const filter = jest.fn();
  let props = {
    content: {
      back: 'Back',
    },
    activeTab: 'SENT',
    messages: {
      draftError: true,
      successModal: true,
      filter: filter,
    },
    location: {
      messageDetail: {
        status: 'NEW',
      },
    },
    messagesFetched: {
      fetching: false,
      successModal: false,
    },
    dispatch: dispatch,
    setViewMessageDetail: jest.fn(),
    setMessageRead: jest.fn(),
  };

  let component = shallow(<ViewMessage {...props} />);

  it('should match to snapshot', () => {
    component.setState({
      showDeleteConfirmModal: true,
      showDeleteSuccessModal: true,
      showSendServiceErrorModal: true,
    });
    expect(component).toMatchSnapshot();
  });

  it('updates native app with new unread message count if within webView', () => {
    const filter = jest.fn(() => {
      return {
        length: 3,
      };
    });
    let props = {
      content: {
        sentPageTitle: 'sentPageTitle',
      },
      activeTab: 'SENT',
      setMessageRead: jest.fn(),
      messages: {
        draftError: true,
        successModal: true,
        filter: filter,
        messages: [{ status: 'NEW' }, { status: 'NEW' }, { status: 'NEW' }],
      },
      location: {
        messageDetail: { status: 'NEW' },
      },
      messagesFetched: {
        fetching: false,
        successModal: false,
      },
      dispatch: dispatch,
      setMessagesMetaData: jest.fn(),
      hasAttachment: false,
      isWebView: true,
      setViewMessageDetail: jest.fn(),
    };

    shallow(<ViewMessage {...props} />);

    expect(props.setMessagesMetaData).toHaveBeenCalledWith({
      unread: 2,
    });
  });

  it('does not update native app with new unread messafge count if not within web view', () => {
    let props = {
      content: {
        sentPageTitle: 'sentPageTitle',
      },
      activeTab: 'SENT',
      setMessageRead: jest.fn(),
      messages: {
        draftError: true,
        successModal: true,
        filter: filter,
        messages: [{ status: 'NEW' }, { status: 'NEW' }, { status: 'NEW' }],
      },
      location: {
        messageDetail: { status: 'NEW' },
      },
      messagesFetched: {
        fetching: false,
        successModal: false,
      },
      dispatch: dispatch,
      setMessagesMetaData: jest.fn(),
      hasAttachment: false,
      isWebView: false,
      setViewMessageDetail: jest.fn(),
    };
    shallow(<ViewMessage {...props} />);
    expect(props.setMessagesMetaData).not.toHaveBeenCalled();
  });

  it('does not update message status to read when in readOnly mode', () => {
    let props = {
      content: {
        sentPageTitle: 'sentPageTitle',
      },
      activeTab: 'SENT',
      setMessageRead: jest.fn(),
      messages: {
        draftError: true,
        successModal: true,
        filter: filter,
        messages: [{ status: 'NEW' }, { status: 'NEW' }, { status: 'NEW' }],
      },
      location: {
        messageDetail: { status: 'NEW' },
      },
      messagesFetched: {
        fetching: false,
        successModal: false,
      },
      dispatch: jest.fn(),
      setMessagesMetaData: jest.fn(),
      hasAttachment: false,
      isWebView: false,
      readOnly: true,
      setViewMessageDetail: jest.fn(),
    };
    shallow(<ViewMessage {...props} />);
    expect(props.setViewMessageDetail).toHaveBeenCalledTimes(1);
  });

  it('does not render Reply button if message has noReply flag', () => {
    let props = {
      content: {
        sentPageTitle: 'sentPageTitle',
      },
      activeTab: 'SENT',
      setMessageRead: jest.fn(),
      messages: {
        draftError: true,
        successModal: true,
        filter: filter,
        messages: [{ status: 'NEW' }, { status: 'NEW' }, { status: 'NEW' }],
      },
      location: {
        messageDetail: { status: 'NEW', noReply: true },
      },
      messagesFetched: {
        fetching: false,
        successModal: false,
      },
      dispatch: jest.fn(),
      setMessagesMetaData: jest.fn(),
      hasAttachment: false,
      isWebView: false,
      readOnly: false,
      setViewMessageDetail: jest.fn(),
    };
    const wrapper = shallow(<ViewMessage {...props} />);
    expect(wrapper.find('#reply-button')).toHaveLength(0);
  });
});

/** @todo kill all snapshot tests */
describe.skip('Main snapshot', () => {
  const filter = jest.fn();
  let props = {
    content: {
      sentPageTitle: 'sentPageTitle',
    },
    activeTab: 'SENT',
    setMessageRead: jest.fn(),
    messages: {
      draftError: true,
      successModal: true,
      filter: filter,
    },
    location: {
      messageDetail: { status: 'sent' },
    },
    successModal: true,

    messagesFetched: {
      fetching: false,
      successModal: false,
    },
    setViewMessageDetail: jest.fn(),
  };

  let component = shallow(<ViewMessage {...props} />);

  it('should match to snapshot', () => {
    component.setState({
      showDeleteConfirmModal: false,
      showDeleteSuccessModal: false,
      showSendServiceErrorModal: false,
    });
    expect(component).toMatchSnapshot();
  });
});
