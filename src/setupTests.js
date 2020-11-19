import Enzyme from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-15.4';

const context = global;

window.scrollTo = () => {};
Enzyme.configure({ adapter: new EnzymeAdapter() });
