import Enzyme from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

const context = global;

window.scrollTo = () => {};
Enzyme.configure({ adapter: new EnzymeAdapter() });
