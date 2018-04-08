import React from 'react';
import { shallow, mount } from 'enzyme';
import TextAreaComponent from '../common/TextAreaComponent'
import sinon from 'sinon';


describe('TextAreaComponent Component Check', () => {
  sinon.spy(TextAreaComponent.prototype, 'componentDidMount');
  const componentWrap = mount(<TextAreaComponent messageBody='text' disableText={true}/>);

  it("TextAreaComponent component should mount", () =>{
    expect(typeof componentWrap).toBe('object');
  });
  it("Props Check", () =>{
    expect(componentWrap.props().messageBody).toEqual('text');
    expect(componentWrap.props().disableText).toEqual(true);
    
  });
  it("Textarea Check", () =>{
    expect(componentWrap.find('textarea')).toHaveLength(1);
  });
  it("It should have componentDidMount method", () =>{
    expect(TextAreaComponent.prototype.componentDidMount.calledOnce).toBe(true);
  });

});
