import React from 'react';
import { shallow, mount } from 'enzyme';
import StepHeader from '../common/StepHeader';
import { Router } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';

const history = createBrowserHistory()

describe('StepHeader Component Check', () => {

  const componentWrap = mount(<Router history={history}><StepHeader headerCrumbsPath="/test"
    headerTitle='title' showControl={false} showheaderCrumbs={true} /></Router>);

  it("StepHeader component should mount", () => {
    expect(typeof componentWrap).toBe('object');
  });
  it("Props Check", () => {
    expect(componentWrap.children().props().showheaderCrumbs).toEqual(true);
    expect(componentWrap.children().props().showControl).toEqual(false);
  });
  it("StepHeader verification", () => {
    expect(componentWrap.find('.c-step-header')).toHaveLength(1);
    expect(componentWrap.find('.c-step-header__crumbs')).toHaveLength(1);
    expect(componentWrap.find('.c-step-header__title')).toHaveLength(1);
    expect(componentWrap.find('.c-step-header__subtext')).toHaveLength(1);
    expect(componentWrap.find('.c-step-header__title').text()).toBe('title');
  });
  it('should render correctly', () => {
    const tree = shallow(
      <StepHeader />
    );
    expect(tree).toMatchSnapshot();
  });
});
