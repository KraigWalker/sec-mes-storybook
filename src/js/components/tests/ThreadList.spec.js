import React from 'react';
import { shallow, mount } from 'enzyme';
import { createMockStore } from 'redux-test-utils';
import ThreadList from '../common/ThreadList';
import { Provider } from 'react-redux';
import MessageEntity from '../../entities/MessageEntity';
jest.mock("../common/ThreadsComponent");
let props;
const mountWithStore = (component, store) => {
	const context = { store  };
	return mount(<Provider store={store}>
	{component}
               </Provider>, { context });
};

describe('ThreadList Component Check', () => {
	jest.fn(ThreadList.prototype, 'getThreadList');
	const messageEntity = new MessageEntity();
	const testState = { messages: {} };
	const store = createMockStore(testState);
	const componentWrap = mountWithStore(<ThreadList currentMessage={messageEntity} isFromReplyMessage {...props}/>, store);

	it('ThreadList component should mount', () => {
		expect(typeof componentWrap).toBe('object');
	});
	it('Props Check', () => {
		expect(componentWrap.children().props().currentMessage).toEqual(messageEntity);
		expect(componentWrap.children().props().isFromReplyMessage).toEqual(true);
	});
	// it('It should have getThreadList method', () => {
	// 	expect(ThreadList.prototype.getThreadList.calledOnce).toBe(true);
	// });
   it('should render correctly', () => {
   const tree = shallow(
     <ThreadList />
   );
   expect(tree).toMatchSnapshot();
 });
});
