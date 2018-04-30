import React from 'react';
import { DraftSecureMessage } from '../DraftSecureMessage';
import { shallow } from 'enzyme';
import TestUtils from 'react-addons-test-utils';
jest.mock('../../bl/SecureMessageBL');
let component;
let props;
let e;
let instance;
const shallowRender = props => {
    const shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(<DraftSecureMessage
        {...props}
    />);
    return shallowRenderer.getRenderOutput();
};
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
        location: {
            messageDetail: {
                account: {
                    accountId: '343434222',
                    number: '5666666',
                }
            }
        },
        dispatch: dispatch
    };
    let component = shallow(<DraftSecureMessage {...props} />);
    it('should match to snapshot', () => {
        expect(component).toMatchSnapshot();
    });
    it('selectSubject function test with subj', () => {
        component.instance().selectSubject('test', 'subjects', { value: 'test' });
        expect(component.instance()).toBeTruthy();
    });
    it('selectSubject function test with accounts', () => {
        component.instance().selectSubject('test', 'accounts', { name: 'test', number: '123443543543', accountId: '1dwwd1e12e21321dd2d' });
        expect(component.instance()).toBeTruthy();
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
    // it('textChange function test with extracted string', () => {
    //     let extractedString = '1234567890'
    //     const lastFour = '7890'
    //     component.instance().textChange('new message').messageEntity.setMessage('new message');
    //     expect(textChange().messageEntity.setMessage(lastFour)).toBe('new message');
    //     //expect(component.instance().state.disabled).toBeFalsy();
    // });
    // it('textChange function test with extracted string', () => {
    //     let extractedString = '1234567890'
    //     const lastFour = '7890'
    //     component.instance().textChange('new message');
    //     expect(messageEntity.setMessage('new message')).toEqual('new message');
    //     expect(component.instance().state.disabled).toBeFalsy();
    // });
    it('sendData function test', () => {
        component.instance().sendData();
        component.setState({ charError: true, showSentMessageModal: true, showSendServiceErrorModal: true });
        expect(component.instance().state.charError).toBeTruthy();
    });
    it('saveDraftData function test', () => {
        component.instance().saveDraftData();
        component.setState({ showDraftSuccessModal: true, chars_left: 40 });
        expect(component.instance().state.showDraftSuccessModal).toBeTruthy();
        expect(props.dispatch).toBeCalled();
    });
    it('sendData function test', () => {
        component.instance().retryServiceCall();
        //  component.setState({ charError: true, showSentMessageModal: true, showSendServiceErrorModal: true });
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
    // it('checkAccountValue function test', () => {
    //     component.instance().checkAccountValue();
    //     component.setState({ charError: true, chars_left: 0 });
    //     expect(props.dispatch).toBeCalled();
    // });

    // for all 3 comp
});

describe("New Secure message", () => {
    const dispatch = jest.fn();
    let props = {
        content: {
            back: 'Back',
        },
        messages: {
            successModal: true,
            messages: [],
            draftError: true
        },
        location: {
            messageDetail: {
                account: {
                    accountId: '343434222'
                }
            }
        },
        dispatch: dispatch
    };
    it('returnErrorModal function test', () => {
        const wrapper = shallow(<DraftSecureMessage {...props} />);
        wrapper.setState({ showSaveServiceErrorModal: true, showSendServiceErrorModal: true, showDraftSuccessModal: true, showSentMessageModal: true, disabled: false, showPopup: true });
        expect(wrapper.instance().state.showSendServiceErrorModal).toBeTruthy();
    });
});
