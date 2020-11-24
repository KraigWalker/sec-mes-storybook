import { shallow } from 'enzyme';
import TextAreaWrapper from '../TextAreaWrapper';
import { TextStyled } from 'web-ui-components/lib/atoms/text';
import { ValidationMessage } from 'web-ui-components/lib/molecules/forms';

const basicProps = {
  id: 'TextArea',
  rows: 20,
  cols: 20,
  maxChars: 300,
  charsLeftDisplayThreshold: 100,
  onChange: jest.fn(),
  content: {},
};

describe('TextAreaWrapper snapshot', () => {
  let props = {
    ...basicProps,
    value: 'Some message value',
  };

  let wrapper = shallow(<TextAreaWrapper {...props} />);
  it('should match to snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});

describe('TextAreaWrapper prop testing', () => {
  it('if passed value at which character count needs to display then show it', () => {
    let props = {
      ...basicProps,
      maxChars: 10,
      charsLeftDisplayThreshold: 5,
      value: 'hello u',
    };
    let wrapper = shallow(<TextAreaWrapper {...props} />);
    expect(wrapper.find(TextStyled).length).toBe(1);
  });

  it('if below character threshold dont show character count', () => {
    let props = {
      ...basicProps,
      maxChars: 10,
      charsLeftDisplayThreshold: 5,
      value: 'hell',
    };
    let wrapper = shallow(<TextAreaWrapper {...props} />);
    expect(wrapper.find(TextStyled).length).toBe(0);
  });

  it('less than 0 chars left then display error', () => {
    let props = {
      ...basicProps,
      maxChars: 10,
      charsLeftDisplayThreshold: 5,
      value: 'hello world!!!',
    };
    let wrapper = shallow(<TextAreaWrapper {...props} />);
    expect(wrapper.find(ValidationMessage).length).toBe(2);
  });

  it('has no error initially, then exceeds max chars', () => {
    let props = {
      ...basicProps,
      maxChars: 10,
      charsLeftDisplayThreshold: 5,
      value: '',
    };
    let event = {
      target: {
        value: 'Hello world!!!',
      },
    };
    let wrapper = shallow(<TextAreaWrapper {...props} />);
    wrapper.instance().handleChange(event);

    expect(wrapper.find(ValidationMessage).length).toBe(2);
  });

  it('has errors initially, then characters reduce to within threshold that char count displays', () => {
    let props = {
      ...basicProps,
      maxChars: 10,
      charsLeftDisplayThreshold: 5,
      value: 'Hello world!!!!',
    };
    let event = {
      target: {
        value: 'Hello w',
      },
    };
    let wrapper = shallow(<TextAreaWrapper {...props} />);
    wrapper.instance().handleChange(event);

    expect(wrapper.find(ValidationMessage).length).toBe(0);
    expect(wrapper.find(TextStyled).length).toBe(1);
  });
});
