import React from 'react';
import { ViewMessage } from '../ViewMessage';
import { shallow } from 'enzyme';
import TestUtils from 'react-addons-test-utils';
jest.mock('../../bl/SecureMessageBL');

describe("View Message snapshot", () => {
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
            }
        },
        messagesFetched: {
            fetching: false,
            successModal: false
        },
        dispatch: dispatch
    };
    let component = shallow(<ViewMessage {...props} />);
    it('should match to snapshot', () => {
        component.setState({ showDeleteConfirmModal: true, showDeleteSuccessModal: true, showSendServiceErrorModal: true });
        expect(component).toMatchSnapshot();
    });
    it('CloseModal function test', () => {
        component.instance().closeModal();
        expect(component.instance().state.showDeleteConfirmModal).toBeFalsy();
    });
    it('errorCloseClicked function test', () => {
        component.instance().errorCloseClicked();
        expect(component.instance().state.showSendServiceErrorModal).toBeFalsy();
    });
    it('handleDelete function test', () => {
        component.instance().handleDelete();
        expect(component.instance().state.showDeleteConfirmModal).toBeTruthy();
    });
    it('deleteClick function test', () => {
        component.instance().deleteClick();
        expect(component.instance().state.showDeleteConfirmModal).toBeFalsy();
    });
    it('closeSuccessModal function test', () => {
        component.instance().closeSuccessModal();
        expect(component.instance().state.showDeleteSuccessModal).toBeFalsy();
    });
    it('retryServiceCall function test', () => {
        component.instance().retryServiceCall();
        expect(props.dispatch).toBeCalled();
    });
    it('renders attachment section if hasAttachment true', () => {
        let props = {
            content: {
                sentPageTitle: 'sentPageTitle',
            },
            activeTab: 'SENT',
            messages: {
                draftError: true,
                successModal: true,
                filter: filter,
            },
            location: {
                messageDetail: { status: 'sent' }
            },
            messagesFetched: {
                fetching: false,
                successModal: false
            },
            dispatch: dispatch,
            hasAttachment: true
        };
        const component = shallow(<ViewMessage {...props} />);
        expect(component.find("Attachments")).toHaveLength(1);
    });

    it("does not render attachments if hasAttachment false", () => {
        let props = {
            content: {
                sentPageTitle: 'sentPageTitle',
            },
            activeTab: 'SENT',
            messages: {
                draftError: true,
                successModal: true,
                filter: filter,
            },
            location: {
                messageDetail: { status: 'sent' }
            },
            messagesFetched: {
                fetching: false,
                successModal: false
            },
            dispatch: dispatch,
            hasAttachment: false
        };
        const component = shallow(<ViewMessage {...props} />);
        expect(component.find("Attachments")).toHaveLength(0);
    });

    it("updates message status to READ if NEW message", () => {
        let props = {
            content: {
                sentPageTitle: 'sentPageTitle',
            },
            activeTab: 'SENT',
            messages: {
                draftError: true,
                successModal: true,
                filter: filter,
            },
            location: {
                messageDetail: { status: 'NEW' }
            },
            messagesFetched: {
                fetching: false,
                successModal: false
            },
            dispatch: dispatch,
            setMessagesMetaData: jest.fn(),
            hasAttachment: false,
            isWebView: false,
        };
        shallow(<ViewMessage {...props} />);
        expect(dispatch).toHaveBeenCalled();
    });

    it("updates native app with new unread message count if within webView", () => {
        let props = {
            content: {
                sentPageTitle: 'sentPageTitle',
            },
            activeTab: 'SENT',
            messages: {
                draftError: true,
                successModal: true,
                filter: filter,
                messages: [
                    { status: 'NEW' }, { status: 'NEW' }, { status: 'NEW' }
                ]
            },
            location: {
                messageDetail: { status: 'NEW' }
            },
            messagesFetched: {
                fetching: false,
                successModal: false
            },
            dispatch: dispatch,
            setMessagesMetaData: jest.fn(),
            hasAttachment: false,
            isWebView: true,
        };
        shallow(<ViewMessage {...props} />);
        expect(props.setMessagesMetaData).toHaveBeenCalledWith({
            unread: 2
        });
    });

    it("does not update native app with new unread messafge count if not within web view", () => {
        let props = {
            content: {
                sentPageTitle: 'sentPageTitle',
            },
            activeTab: 'SENT',
            messages: {
                draftError: true,
                successModal: true,
                filter: filter,
                messages: [
                    { status: 'NEW' }, { status: 'NEW' }, { status: 'NEW' }
                ]
            },
            location: {
                messageDetail: { status: 'NEW' }
            },
            messagesFetched: {
                fetching: false,
                successModal: false
            },
            dispatch: dispatch,
            setMessagesMetaData: jest.fn(),
            hasAttachment: false,
            isWebView: false,
        };
        shallow(<ViewMessage {...props} />);
        expect(props.setMessagesMetaData).not.toHaveBeenCalled();
    });

    it("does not update message status to read when in readOnly mode", () => {
        let props = {
            content: {
                sentPageTitle: 'sentPageTitle',
            },
            activeTab: 'SENT',
            messages: {
                draftError: true,
                successModal: true,
                filter: filter,
                messages: [
                    { status: 'NEW' }, { status: 'NEW' }, { status: 'NEW' }
                ]
            },
            location: {
                messageDetail: { status: 'NEW' }
            },
            messagesFetched: {
                fetching: false,
                successModal: false
            },
            dispatch: jest.fn(),
            setMessagesMetaData: jest.fn(),
            hasAttachment: false,
            isWebView: false,
            readOnly: true,
        };
        shallow(<ViewMessage {...props} />);
        expect(props.dispatch).toHaveBeenCalledTimes(2);
    });

    it("does not render Reply button if message has noReply flag", () => {
        let props = {
            content: {
                sentPageTitle: 'sentPageTitle',
            },
            activeTab: 'SENT',
            messages: {
                draftError: true,
                successModal: true,
                filter: filter,
                messages: [
                    { status: 'NEW' }, { status: 'NEW' }, { status: 'NEW' }
                ]
            },
            location: {
                messageDetail: { status: 'NEW', noReply: true }
            },
            messagesFetched: {
                fetching: false,
                successModal: false
            },
            dispatch: jest.fn(),
            setMessagesMetaData: jest.fn(),
            hasAttachment: false,
            isWebView: false,
            readOnly: false,
        };
        const wrapper = shallow(<ViewMessage {...props} />);
        expect(wrapper.find("#reply-button")).toHaveLength(0);
    });

    it("renders reply button if not readOnly mode and no noReply flag", () => {
        let props = {
            content: {
                sentPageTitle: 'sentPageTitle',
            },
            activeTab: 'SENT',
            messages: {
                draftError: true,
                successModal: true,
                filter: filter,
                messages: [
                    { status: 'NEW' }, { status: 'NEW' }, { status: 'NEW' }
                ]
            },
            location: {
                messageDetail: { status: 'NEW' , noReply: false}
            },
            messagesFetched: {
                fetching: false,
                successModal: false
            },
            dispatch: jest.fn(),
            setMessagesMetaData: jest.fn(),
            hasAttachment: false,
            isWebView: false,
            readOnly: false,
        };
        const wrapper = shallow(<ViewMessage {...props} />);
        expect(wrapper.find("#reply-button")).toHaveLength(1);
    });

});
describe("Main snapshot", () => {
    const dispatch = jest.fn();
    const filter = jest.fn();
    let props = {
        content: {
            sentPageTitle: 'sentPageTitle',
        },
        activeTab: 'SENT',
        messages: {
            draftError: true,
            successModal: true,
            filter: filter,
        },
        location: {
            messageDetail: { status: 'sent' }
        },
        messagesFetched: {
            fetching: false,
            successModal: false
        },
        dispatch: dispatch
    };
    let component = shallow(<ViewMessage {...props} />);
    it('should match to snapshot', () => {
        component.setState({ showDeleteConfirmModal: false, showDeleteSuccessModal: false, showSendServiceErrorModal: false });
        expect(component).toMatchSnapshot();
    });
});