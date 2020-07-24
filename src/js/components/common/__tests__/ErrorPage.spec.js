import React from 'react';
import { shallow } from 'enzyme';
import { ErrorPage } from '../ErrorPage';

describe('ErrorPage snapshot', () => {
  const dispatch = jest.fn();
  let props = {
    location: {
      content: {
        back: 'Back',
        retry: 'Retry',
        backToAccounts: 'Back to accounts',
      },
    },

    messages: {
      fetching: false,
    },
    dispatch: dispatch,
  };
  let component = shallow(<ErrorPage {...props} />);
  it('should match to snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
