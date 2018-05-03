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