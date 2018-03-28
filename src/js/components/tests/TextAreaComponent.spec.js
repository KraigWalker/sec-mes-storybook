import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import TextAreaComponent from '../common/TextAreaComponent'
import sinon from 'sinon';


describe('TextAreaComponent Component Check', () => {
  sinon.spy(TextAreaComponent.prototype, 'componentDidMount');
  const componentWrap = mount(<TextAreaComponent messageBody='text' disableText={true}/>);

  it("TextAreaComponent component should mount", () =>{
    expect(componentWrap).to.be.an('object');
  });
  it("Props Check", () =>{
    expect(componentWrap.props().messageBody).to.eql('text');
    expect(componentWrap.props().disableText).to.eql(true);
    
  });
  it("Textarea Check", () =>{
    expect(componentWrap.find('textarea')).to.have.length(1);
  });
  it("It should have componentDidMount method", () =>{
    expect(TextAreaComponent.prototype.componentDidMount.calledOnce).to.equal(true);
  });

});
