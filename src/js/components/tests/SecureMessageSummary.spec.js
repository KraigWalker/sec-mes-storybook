import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import { createMockStore } from 'redux-test-utils';
import { Provider } from "react-redux";
import SecureMessageSummary from '../common/SecureMessageSummary'

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
    expect(componentWrap).to.be.an('object');
  });
  it("Props Check", () =>{
    expect(componentWrap.props().threadFlag).to.eql(true);
  });

});
