import React from 'react';
import content from '../../content';
import { shallow, mount } from 'enzyme';
import TestData from '../../content/secureMessagesTestData.json'
import CalloutComponent from '../common/CalloutComponent'
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });

describe('CalloutComponent Component Check', () => {

  const testData = { "accessibilityMessage": 'this is check' }
  const componentWrap = mount(<CalloutComponent dClass='callout' paraText='sampletext' />);

  it("LandingPage component should mount", () => {
    expect(typeof componentWrap).toBe('object');
  });
  it("It should be visually hidden", () => {
    expect(componentWrap.html()).toBe('<div class="callout"><p class="">sampletext</p></div>');
  });
  it("Props Check", () => {
    expect(componentWrap.props().paraText).toEqual('sampletext');
    expect(componentWrap.props().dClass).toEqual('callout');
  });
  it('should render correctly', () => {
    const tree = shallow(
      <CalloutComponent />
    );
    expect(tree).toMatchSnapshot();
  });
});
