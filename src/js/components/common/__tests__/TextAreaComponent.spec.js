import React from 'react';
import { shallow, mount } from 'enzyme';
import TextAreaComponent from '../TextAreaComponent';

describe('TextAreaComponent Component Check', () => {
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

  it('should render correctly', () => {
   const tree = shallow(
     <TextAreaComponent name='message' />
   );
   expect(tree).toMatchSnapshot();
 });

});