import React from 'react';
import { Main } from '../Main';
import { shallow } from 'enzyme';
import TestUtils from 'react-addons-test-utils';

describe("Main snapshot", () => {
    let props = {
        children: 'cjejd'
    };
    let component = shallow(<Main {...props} />);
    it('should match to snapshot', () => {
        expect(component).toMatchSnapshot();
    });
});