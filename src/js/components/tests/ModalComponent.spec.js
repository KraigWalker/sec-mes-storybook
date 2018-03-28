import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import ModalComponent from '../common/ModalComponent'



describe('ModalComponent Component Check', () => {
  const testFunc = function(){
    return 'called';
  }
  const componentWrap = shallow(<ModalComponent show={true} onHide={testFunc} bsSize='testit' modalheading='testheading' 
                                              modalbody={{'key1':'testbody'}} modalfooter={{'key2':'testfooter'}} customClass='classString'
                                              closeButton={false}/>);

  it("ModalComponent component should mount", () =>{
    expect(componentWrap).to.be.an('object');
  });
  it("Props Check", () =>{
    expect(componentWrap.props().show).to.eql(true);
    expect(componentWrap.props().onHide).to.eql(testFunc);
    expect(componentWrap.props().bsSize).to.eql('testit');
    expect(componentWrap.props().modalheading).to.eql('testheading');
    expect(componentWrap.props().modalfooter).to.eql({'key2':'testfooter'});
  });
  it("Modal Check", () =>{
    expect(componentWrap.find('Modal')).to.have.length(1);
  });

});
