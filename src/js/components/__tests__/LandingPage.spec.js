import { shallow } from 'enzyme';
import { LandingPage } from '../LandingPage';

describe('Landing Page else snapshot', () => {
  const dispatch = jest.fn();
  let props = {
    content: {
      back: 'Back',
      retry: 'Retry',
      backToAccounts: 'Back to accounts',
    },
    fingerPrintID: '2344323434523',
    messages: {
      error: false,
      fetched: false,
      messages: [],
    },
    dispatch: dispatch,
    getMessageSubjects: jest.fn(),
    getActiveTab: jest.fn(),
  };
  let component = shallow(<LandingPage {...props} />);
  it('should match to snapshot', () => {
    expect(component).toMatchSnapshot();
  });
  describe.skip('Landing Page if snapshot', () => {
    const push = jest.fn();
    it('should match to snapshot', () => {
      expect(push).toBeCalled();
    });
  });
});
