import React from 'react';
import { shallow, mount } from 'enzyme';
import { DropDownComponent } from '../DropDownComponent';

describe("Dropdown snapshot", () => {
    const selectSubject = jest.fn();
    let props = {
        content: {
            back: 'Back',
        },
        accessID: 'Subject',
        messages: [],
        successModal: false,
        selectedAccountValue: null,
        subjects: [],
        subjectErrors: false,
        showSubjectError: false,
        showAccountError: false,
        accounts: [],
        id: 'subjects',
        selectSubject: selectSubject,
        popupState: jest.fn()

    };
    let component = shallow(<DropDownComponent {...props} />);
    component.setState({ showErrorModal: true });
    it('should match to snapshot', () => {
        expect(component).toMatchSnapshot();
    });
    
});
