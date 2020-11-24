import { Main } from '../Main';
import { shallow } from 'enzyme';

describe('Main snapshot', () => {
  let props = {
    children: 'cjejd',
    location: {
      pathname: '',
    },
  };
  let component = shallow(<Main {...props} />);
  it('should match to snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
