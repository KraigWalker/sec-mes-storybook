import { shallow } from 'enzyme';
import GetIcon from '../GetIcon';

describe('GetIcon Component Check', () => {
  const componentWrap = shallow(<GetIcon className="sampletext" width="24px" height="24px" id="someid" />);

  it('GetIcon component should mount', () => {
    expect(typeof componentWrap).toBe('object');
  });
  it('Props Check', () => {
    expect(componentWrap.props().className).toEqual('sampletext');
    expect(componentWrap.props().width).toEqual('24px');
    expect(componentWrap.props().height).toEqual('24px');
  });
  it('SVG URL verification', () => {
    expect(componentWrap.find("[xlinkHref='../../images/icons.svg#someid']")).toHaveLength(0);
  });
  it('should render correctly', () => {
    const tree = shallow(<GetIcon />);
    expect(tree).toMatchSnapshot();
  });
});
