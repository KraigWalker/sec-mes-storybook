
import React from 'react';
import { shallow, mount } from 'enzyme';
import { SecureMessageSummary } from '../SecureMessageSummary';

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
  it('should call all the modal methods', () => {
    component.setState({ showDeleteConfirmModal: true, showDeleteSuccessModal: true, showSendServiceErrorModal: true, viewMessageFlag: true });
    expect(component.instance().state.showSendServiceErrorModal).toBeTruthy();
  });
  it('handleDelete function test', () => {
    component.instance().handleDelete();
    expect(component.instance().state.showDeleteConfirmModal).toBeTruthy();
  });
  it('errorCloseClicked function test', () => {
    component.instance().errorCloseClicked();
    expect(component.instance().state.showSendServiceErrorModal).toBeFalsy();
  });
  it('closeSuccessModal function test', () => {
    component.instance().closeSuccessModal();
    expect(component.instance().state.showDeleteSuccessModal).toBeFalsy();
  });
  it('closeModal function test', () => {
    component.instance().closeModal();
    expect(component.instance().state.showDeleteConfirmModal).toBeFalsy();
  });
  it('deleteClick function test', () => {
    component.instance().deleteClick();
    expect(component.instance().state.showDeleteConfirmModal).toBeFalsy();
  });
  it('deleteClick function test', () => {
    component.instance().deleteClick();
    expect(props.dispatch).toBeCalled();
  });
  it('retryServiceCall function test', () => {
    component.instance().retryServiceCall();
    expect(props.dispatch).toBeCalled();
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
    it('deleteClick function test', () => {
      component.instance().deleteClick();
      expect(props.dispatch).toBeCalled();
    });
    it('should call all the modal methods', () => {
      component.setState({ showDeleteConfirmModal: true, showDeleteSuccessModal: true, showSendServiceErrorModal: true, viewMessageFlag: true });
      expect(component.instance().state.showSendServiceErrorModal).toBeTruthy();
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
    it('should call all the modal methods', () => {
      component.setState({ showDeleteConfirmModal: true, showDeleteSuccessModal: true, showSendServiceErrorModal: true, viewMessageFlag: true });
      expect(component.instance().state.showSendServiceErrorModal).toBeTruthy();
    });
  });
});