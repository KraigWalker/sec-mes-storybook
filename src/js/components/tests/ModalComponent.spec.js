import React from 'react';
import { shallow, mount } from 'enzyme';
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import ModalComponent from '../common/ModalComponent';

Enzyme.configure({ adapter: new Adapter() });

describe('ModalComponent Component Check', () => {
  const testFunc = function () {
    return 'called';
  }
  const componentWrap = shallow(<ModalComponent show={true} onHide={testFunc} bsSize='testit' modalheading='testheading'
    modalbody={{ 'key1': 'testbody' }} modalfooter={{ 'key2': 'testfooter' }} customClass='classString'
    closeButton={false} />);

  it("ModalComponent component should mount", () => {
    expect(typeof componentWrap).toBe('object');
  });
  it("Props Check", () => {
    expect(componentWrap.props().show).toEqual(true);
    expect(componentWrap.props().onHide).toEqual(testFunc);
    expect(componentWrap.props().bsSize).toEqual('testit');
    expect(componentWrap.props().modalheading).toEqual('testheading');
    expect(componentWrap.props().modalfooter).toEqual({ 'key2': 'testfooter' });
  });
  it("Modal Check", () => {
    expect(componentWrap.find('Modal')).toHaveLength(1);
  });
  it('should render correctly', () => {
    const tree = shallow(
      <ModalComponent />
    );
    expect(tree).toMatchSnapshot();
  });
});
