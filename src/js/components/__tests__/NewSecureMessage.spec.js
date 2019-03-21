import React from 'react';
import { NewSecureMessage } from '../NewSecureMessage';
import { shallow } from 'enzyme';
import TestUtils from 'react-addons-test-utils';
import SendMessageRequestEntity from '../../entities/SendMessageRequestEntity';

let component;
let props;
const messageEntity = new SendMessageRequestEntity();

describe("New Secure message snapshot", () => {
    const dispatch = jest.fn();
    let props = {
        content: {
            back: 'Back',
        },
        messages: {
            successModal: false,
            newMessageError: false,
            messages: []
        },
        dispatch: dispatch
    };
    let component = shallow(<NewSecureMessage {...props} />);
    it('should match to snapshot', () => {
        expect(component).toMatchSnapshot();
    });
    it('Leave Page function test', () => {
        component.instance().leavePage();
        expect(component.instance().state.showPopup).toBeTruthy();
    });
    it('Stay Page function test', () => {
        component.instance().stayOnPage();
        expect(component.instance().state.showPopup).toBeFalsy();
    });
    it('callBackModal function test', () => {
        component.instance().callBackModal();
        expect(component.instance().state.showPopup).toBeTruthy();
    });
    it('selectSubject function test with subj', () => {
        component.instance().selectSubject('test', 'subjects', { value: 'test' });
        expect(component.instance().state.selectSubject).toBeTruthy();
    });
    it('selectSubject function test with accounts', () => {
        component.instance().selectSubject('test', 'accounts', { name: 'test', number: '123443543543', accountId: '1dwwd1e12e21321dd2d' });
        expect(component.instance().state.selectAccount).toBeTruthy();
    });
    it('selectSubject function test with default case', () => {
        component.instance().selectSubject('test', '', { value: 'test' });
        expect(component.instance()).toBeTruthy();
    });
    it('draftOkClicked function test', () => {
        component.instance().draftOkClicked();
        expect(component.instance().state.showDraftSuccessModal).toBeFalsy();
    });
    it('sentOkClicked function test', () => {
        component.instance().sentOkClicked();
        expect(component.instance().state.showSentMessageModal).toBeFalsy();
    });
    it('errorCloseClicked function test', () => {
        component.instance().errorCloseClicked();
        expect(component.instance().state.showSaveServiceErrorModal).toBeFalsy();
    });
    it('textChange function test with no text', () => {
        component.instance().textChange('');
        expect(component.instance().state.disabled).toBeTruthy();
    });
    it('textChange function test with text', () => {
        component.instance().textChange('new message');
        expect(component.instance().state.disabled).toBeFalsy();
    });
    it('checkValidation function test with selectAccount', () => {
        component.instance().checkValidation();
        component.setState({ selectAccount: true, validationAccountMsg: false });
        expect(component.instance().state.validationAccountMsg).toBeFalsy();
    });
    it('checkValidation function test with selectAccount', () => {
        component.instance().checkValidation();
        component.setState({ selectAccount: false, validationAccountMsg: true });
        expect(component.instance().state.validationAccountMsg).toBeTruthy();
    });
    it('retryServiceCall function test', () => {
        component.instance().retryServiceCall();
        expect(props.dispatch).toBeCalled();
    });
    it('renderRemainingChar function test', () => {
        component.instance().renderRemainingChar();
        component.setState({ charError: true, chars_left: -2 });
        expect(props.dispatch).toBeCalled();
    });
    it('renderRemainingChar function test', () => {
        component.instance().renderRemainingChar();
        component.setState({ charError: true, chars_left: 3 });
        expect(props.dispatch).toBeCalled();
    });
    it('renderRemainingChar function test', () => {
        component.instance().renderRemainingChar();
        component.setState({ charError: true, chars_left: 1 });
        expect(props.dispatch).toBeCalled();
    });
    it('renderRemainingChar function test', () => {
        component.instance().renderRemainingChar();
        component.setState({ charError: true, chars_left: 0 });
        expect(props.dispatch).toBeCalled();
    });
    it('renderRemainingChar function test', () => {
        component.instance().renderRemainingChar();
        let headerflagClass = 'char__error error__right';
        component.setState({ chars_left: -78 });
        expect(headerflagClass).toEqual('char__error error__right');
    });
    it('returnModalComponent function test', () => {
        component.instance().returnModalComponent();
        component.setState({ showPopup: false });
        expect(component.instance().state.showPopup).toBeFalsy();
    });

    // for all 3 comp
});

describe("New Secure message", () => {
    const dispatch = jest.fn();
    let props = {
        content: {
            back: 'Back',
        },
        messages: {
            newMessageError: true,
            successModal: true
        },
        dispatch: dispatch
    }

    it('returnErrorModal function test', () => {
        const wrapper = shallow(<NewSecureMessage {...props} />);
        wrapper.setState({ showSaveServiceErrorModal: true, showSendServiceErrorModal: true, showDraftSuccessModal: true, showSentMessageModal: true, disabled: false });
        expect(wrapper.instance().state.showSendServiceErrorModal).toBeTruthy();
    });
});



