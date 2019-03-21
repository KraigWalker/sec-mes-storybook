import Enzyme from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-15.4';

window.scrollTo = () => {};
Enzyme.configure({ adapter: new EnzymeAdapter() });

