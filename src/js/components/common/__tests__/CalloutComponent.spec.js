import React from 'react';
import { shallow, mount } from 'enzyme';
import CalloutComponent from '../CalloutComponent'

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
