import React from 'react';
import { shallow, mount } from 'enzyme';
import { createMockStore } from 'redux-test-utils';
import ThreadList from '../common/ThreadList'
import sinon from 'sinon';
import { Provider } from "react-redux";
import MessageEntity from '../../entities/MessageEntity';



const mountWithStore = (component, store) => {
  const context = {store,};
  return mount(<Provider store={store}>
                    {component}
                </Provider>, { context });
};

describe('ThreadList Component Check', () => {
  sinon.spy(ThreadList.prototype, 'getThreadList');
  const messageEntity = new MessageEntity();
  const testState = {messages: {}};
  const store = createMockStore(testState);
  const componentWrap = mountWithStore(<ThreadList currentMessage={messageEntity} isFromReplyMessage={true}/>, store);

  it("ThreadList component should mount", () =>{
    expect(typeof componentWrap).toBe('object');
  });
  it("Props Check", () =>{
    expect(componentWrap.children().props().currentMessage).toEqual(messageEntity);
    expect(componentWrap.children().props().isFromReplyMessage).toEqual(true);
  });
  it("It should have getThreadList method", () =>{
    expect(ThreadList.prototype.getThreadList.calledOnce).toBe(true);
  });

});
