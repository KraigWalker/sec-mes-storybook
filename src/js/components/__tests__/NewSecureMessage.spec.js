import React from 'react';
import { NewSecureMessage } from '../NewSecureMessage';
import { shallow } from 'enzyme';


describe("New Secure message snapshot", () => {
    const dispatch = jest.fn();
    let props = {
        content : {
            back : 'Back',
        },
        messages: {
            successModal: false,
            newMessageError: false,
            newMessageError: false,
            messages: []
        },
        dispatch: dispatch
    };
    let component = shallow(<NewSecureMessage {...props}/>);
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
        component.instance().selectSubject('test', 'subjects', {value: 'test' });
        expect(component.instance().state.selectSubject).toBeTruthy();
    });
    it('selectSubject function test with accounts', () => {
        component.instance().selectSubject('test', 'accounts', {name: 'test', number: '123443543543', accountId: '1dwwd1e12e21321dd2d' });
        expect(component.instance().state.selectAccount).toBeTruthy();
    });
});



