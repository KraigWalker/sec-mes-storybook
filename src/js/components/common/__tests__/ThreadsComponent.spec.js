import React from 'react';
import { shallow, mount } from 'enzyme';
import { createMockStore } from 'redux-test-utils';
import ThreadsComponent from '../ThreadsComponent'
import { Provider } from "react-redux";
import MessageEntity from '../../../entities/MessageEntity';
jest.mock("../ThreadsComponent");

const mountWithStore = (component, store) => {
  const context = {store,};
  return mount(<Provider store={store}>
                    {component}
                </Provider>, { context });
};

describe('ThreadsComponent Component Check', () => {
  jest.fn(ThreadsComponent.prototype, 'getThreadsComponent');
  const messageEntity = new MessageEntity();
  const testState = {messages: {}};
  const store = createMockStore(testState);
  const componentWrap = mountWithStore(<ThreadsComponent ThreadDetail={messageEntity}/>, store);

  it("ThreadsComponent component should mount", () =>{
    expect(typeof componentWrap).toBe('object');
  });
  it("Props Check", () =>{
    expect(componentWrap.children().props().ThreadDetail).toEqual(messageEntity);
  });
  it("ThreadsComponent Check", () =>{
    expect(componentWrap.find('SecureMessageSummary')).toHaveLength(0);
  });
   it('should render correctly', () => {
   const tree = shallow(
     <ThreadsComponent />
   );
   expect(tree).toMatchSnapshot();
 });
});
