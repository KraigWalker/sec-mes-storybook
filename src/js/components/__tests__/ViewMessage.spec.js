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
        expect(props.dispatch).toHaveBeenCalledTimes(1);
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