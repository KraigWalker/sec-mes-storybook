import React from 'react';
import { Router } from 'react-router-dom';
import { shallow, mount } from 'enzyme';
import { createMockStore } from 'redux-test-utils';
import { Provider } from "react-redux";
import createBrowserHistory from 'history/createBrowserHistory'
import TestData from '../../content/secureMessagesTestData.json'
import DropDownComponent from '../common/DropDownComponent'
jest.mock("../common/DropDownComponent");

let props;
const history = createBrowserHistory()
const mountWithStore = (component, store) => {
  const context = { store, };
  return mount(<Provider store={store}>
    <Router history={history}>
      {component}
    </Router>
  </Provider>, { context });
};

const selectSubject = (value, id) => {
};

describe('DropDownComponent Component Check', () => {
  const testState = { messages: {} };
  const store = createMockStore(testState);
  const componentWrap = mountWithStore(<DropDownComponent isFromDraftOrReply={true} id="accounts" selectSubject={selectSubject} />, store);

  it("DropDownComponent component should mount", () => {
    expect(typeof componentWrap).toBe('object');
  });
  it('should render correctly', () => {
    const tree = shallow(
      <DropDownComponent {...props}/>
    );
    expect(tree).toMatchSnapshot();
  });
});