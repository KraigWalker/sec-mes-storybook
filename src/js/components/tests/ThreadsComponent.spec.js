import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import { createMockStore } from 'redux-test-utils';
import ThreadsComponent from '../common/ThreadsComponent'
import sinon from 'sinon';
import { Provider } from "react-redux";
import MessageEntity from '../../entities/MessageEntity';



const mountWithStore = (component, store) => {
  const context = {store,};
  return mount(<Provider store={store}>
                    {component}
                </Provider>, { context });
};

describe('ThreadsComponent Component Check', () => {
  // sinon.spy(ThreadsComponent.prototype, 'getThreadsComponent');
  const messageEntity = new MessageEntity();
  const testState = {messages: {}};
  const store = createMockStore(testState);
  const componentWrap = mountWithStore(<ThreadsComponent ThreadDetail={messageEntity}/>, store);

  it("ThreadsComponent component should mount", () =>{
    expect(componentWrap).to.be.an('object');
  });
  it("Props Check", () =>{
    expect(componentWrap.children().props().ThreadDetail).to.eql(messageEntity);
  });
  it("ThreadsComponent Check", () =>{
    expect(componentWrap.find('SecureMessageSummary')).to.have.length(1);
  });

});
