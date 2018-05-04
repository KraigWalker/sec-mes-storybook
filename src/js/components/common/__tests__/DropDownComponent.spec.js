import React from 'react';
import { shallow, mount } from 'enzyme';
import { DropDownComponent } from '../DropDownComponent';

describe("Dropdown snapshot", () => {
    const dispatch = jest.fn();
    const selectSubject = jest.fn();
    let props = {
        content: {
            back: 'Back',
        },
        showAccountError: true,
        showSubjectError: true,
        isFromDraftOrReply: true,
        accessID: 'Subject',
        messages: {
            successModal: false,
            newMessageError: false,
            messages: []
        },
        messagesubjects: {
            error: true,
            subjects: []
        },
        messageaccounts: {
            accounts: []
        },
        id: 'subjects',
        selectSubject: selectSubject,
        dispatch: dispatch
    };
    let component = shallow(<DropDownComponent {...props} />);
    component.setState({ showErrorModal: true });
    it('should match to snapshot', () => {
        expect(component).toMatchSnapshot();
    });
    it('retryServiceCall function test', () => {
        component.instance().retryServiceCall();
        expect(props.dispatch).toBeCalled();
    });
    it('errorCloseClicked function test', () => {
        component.instance().errorCloseClicked();
        expect(component.instance().state.showErrorModal).toBeFalsy();
    });
    it('onBlur function test', () => {
        component.instance().onBlur();
        expect(component.instance().state.list).toBeFalsy();
    });
    it('showList function test', () => {
        component.instance().showList();
        component.setState({ list: false })
        expect(component.instance().state.list).toBeFalsy();
    });
    it('showList function test', () => {
        component.instance().showList();
        expect(component.instance().state.list).toBeTruthy();
    });
    it('overlayclick function test', () => {
        component.instance().overlayclick();
        expect(component.instance().state.list).toBeFalsy();
    });
    it('setDropDrownValue function test', () => {
        let e = {
            target: {
                textContent: 'abcc'
            }
        }
        component.instance().setDropDrownValue(e, props.id, { name: 'test', number: '123443543543', accountId: '1dwwd1e12e21321dd2d' });
        expect(component.instance().state.list).toBeFalsy();
    });
    it('returnMenuItem function test with accounts id and isFromDraftOrReply false', () => {
        const dispatch = jest.fn();
        const selectSubject = jest.fn();
        let props = {
            content: {
                back: 'Back',
            },
            isFromDraftOrReply: false,
            accessID: 'Subject',
            messages: {
                successModal: false,
                newMessageError: false,
                messages: []
            },
            messagesubjects: {
                error: true
            },
            messageaccounts: {
                accounts: []
            },
            accounts: {
                accounts: []
            },
            id: 'accounts',
            selectSubject: selectSubject,
            dispatch: dispatch
        };
        let component = shallow(<DropDownComponent {...props} />);
        component.setState({ showErrorModal: true });
        component.instance().returnMenuItem();
        expect(component).toMatchSnapshot();
    });
    it('returnMenuItem function test with subjects id and isFromDraftOrReply false', () => {
        const dispatch = jest.fn();
        const selectSubject = jest.fn();
        let props = {
            content: {
                back: 'Back',
            },
            isFromDraftOrReply: false,
            accessID: 'Subject',
            messages: {
                successModal: false,
                newMessageError: false,
                messages: []
            },
            messagesubjects: {
                error: true
            },
            messageaccounts: {
                accounts: []
            },
            accounts: {
                accounts: []
            },
            subjects: {
                subjects: []
            },
            id: 'subjects',
            selectSubject: selectSubject,
            dispatch: dispatch
        };
        let component = shallow(<DropDownComponent {...props} />);
        component.setState({ showErrorModal: true });
        component.instance().returnMenuItem();
        expect(component).toMatchSnapshot();
    });
    it('returnMenuItem function test with accounts id and isFromDraftOrReply true', () => {
        const dispatch = jest.fn();
        const selectSubject = jest.fn();
        let props = {
            content: {
                back: 'Back',
            },
            isFromDraftOrReply: true,
            accessID: 'Subject',
            messages: {
                successModal: false,
                newMessageError: false,
                messages: []
            },
            messagesubjects: {
                error: true
            },
            messageaccounts: {
                accounts: []
            },
            accounts: {
                accounts: []
            },
            subjects: {
                subjects: []
            },
            id: 'accounts',
            selectSubject: selectSubject,
            dispatch: dispatch
        };
        let component = shallow(<DropDownComponent {...props} />);
        component.setState({ showErrorModal: true });
        component.instance().returnMenuItem();
        expect(component).toMatchSnapshot();
    });
    it('returnMenuItem function test with default case', () => {
        const dispatch = jest.fn();
        const selectSubject = jest.fn();
        let props = {
            content: {
                back: 'Back',
            },
            isFromDraftOrReply: false,
            accessID: 'Subject',
            messages: {
                successModal: false,
                newMessageError: false,
                messages: []
            },
            messagesubjects: {
                error: true
            },
            id: '',
            selectSubject: selectSubject,
            dispatch: dispatch
        };
        let component = shallow(<DropDownComponent {...props} />);
        component.setState({ showErrorModal: true });
        component.instance().returnMenuItem();
        expect(component).toMatchSnapshot();
    });
});
