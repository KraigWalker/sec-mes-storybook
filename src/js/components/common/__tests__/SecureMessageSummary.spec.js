import React from 'react';
import { shallow, mount } from 'enzyme';
import { createMockStore } from 'redux-test-utils';
import { Provider } from "react-redux";
import SecureMessageSummary from '../SecureMessageSummary'

const shallowWithStore = (component, store) => {
  const context = {store,};
  return shallow(<Provider store={store}>
                    {component}
                </Provider>, { context });
};

describe('SecureMessageSummary Component Check', () => {
  const testState = {messages: {}};
  const store = createMockStore(testState);
  const componentWrap = shallowWithStore(<SecureMessageSummary threadFlag={true}/>, store);

  it("SecureMessageSummary component should mount", () =>{
    expect(typeof componentWrap).toBe('object');
  });
  it("Props Check", () =>{
    expect(componentWrap.props().threadFlag).toEqual(true);
  });

});
