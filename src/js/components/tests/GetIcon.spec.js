import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import { createMockStore } from 'redux-test-utils';
import GetIcon from '../common/GetIcon'



describe('GetIcon Component Check', () => {
    
  const componentWrap = shallow(<GetIcon className="sampletext" width="24px" height="24px" id="someid" />);

  it("GetIcon component should mount", () =>{
    expect(componentWrap).to.be.an('object');
  });
  it("Props Check", () =>{
    expect(componentWrap.props().className).to.eql('sampletext');
    expect(componentWrap.props().width).to.eql('24px');
    expect(componentWrap.props().height).to.eql('24px');
  });
  it("SVG URL verification", () =>{
    expect(componentWrap.find("[xlinkHref='../../images/icons.svg#someid']")).to.have.length(0);
  });
});
