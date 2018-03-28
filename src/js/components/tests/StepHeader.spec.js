import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import StepHeader from '../common/StepHeader'
import {Router} from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory'

const history = createBrowserHistory()


describe('StepHeader Component Check', () => {
    
  const componentWrap = mount(<Router history={history}><StepHeader headerCrumbsPath="/test" 
                              headerTitle='title' showControl={false} showheaderCrumbs={true}/></Router>);

  it("StepHeader component should mount", () =>{
    expect(componentWrap).to.be.an('object');
  });
  it("Props Check", () =>{
    expect(componentWrap.children().props().showheaderCrumbs).to.eql(true);
    expect(componentWrap.children().props().showControl).to.eql(false);
  });
  it("StepHeader verification", () =>{
    expect(componentWrap.find('.c-step-header')).to.have.length(1);
    expect(componentWrap.find('.c-step-header__crumbs')).to.have.length(1);
    expect(componentWrap.find('.c-step-header__title')).to.have.length(1);
    expect(componentWrap.find('.c-step-header__subtext')).to.have.length(1);
    expect(componentWrap.find('.c-step-header__title').text()).to.equal('title');
  });
});
