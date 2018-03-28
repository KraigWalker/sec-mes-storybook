import React from 'react';
import { expect } from 'chai';
import content from '../../content';
import { shallow, mount } from 'enzyme';
import { createMockStore } from 'redux-test-utils';
import TestData from '../../content/secureMessagesTestData.json'
import CalloutComponent from '../common/CalloutComponent'
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });

describe('CalloutComponent Component Check', () => {
    
  const testState = {messages: {}};
  const store = createMockStore(testState);
  const testData = {"accessibilityMessage":'this is check'}
  const componentWrap = mount(<CalloutComponent dClass='callout' paraText='sampletext'/>);

  it("LandingPage component should mount", () =>{
    expect(componentWrap).to.be.an('object');
  });
  it("It should be visually hidden", () =>{
    expect(componentWrap.html()).to.equal('<div class="callout"><p class="">sampletext</p></div>');
  });
  it("Props Check", () =>{
    expect(componentWrap.props().paraText).to.eql('sampletext');
    expect(componentWrap.props().dClass).to.eql('callout');
  });
});
