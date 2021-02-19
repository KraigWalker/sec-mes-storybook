import { Component } from 'react';
import { GenericTextArea } from 'web-ui-components/lib/data/capture';
import { ValidationMessage } from 'web-ui-components/lib/molecules/forms';
import { StandardBody } from 'web-ui-components/lib/typography/body';
import PropTypes from 'prop-types';

const calcCharsLeft = (maxChars, length) => maxChars - length;

class TextAreaWrapper extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.renderRemainingChar = this.renderRemainingChar.bind(this);

    const charsUsed = props.value ? props.value.length : 0;
    this.state = {
      charsLeft: calcCharsLeft(props.maxChars, charsUsed),
      message: props.value,
    };
  }
  render() {
    const { charsLeft, message } = this.state;
    const { charsLeftDisplayThreshold, maxChars, cols, rows, id } = this.props;
    return (
      <div>
        <GenericTextArea
          id={id}
          value={message}
          onChange={this.handleChange}
          maximumCharacters={maxChars}
          characterWidth={cols}
          rowCount={rows}
          hideCharacterCount={charsLeft >= charsLeftDisplayThreshold}
        />
        {this.renderRemainingChar()}
      </div>
    );
  }

  renderRemainingChar() {
    const { charsLeft } = this.state;
    const { content } = this.props;
    if (charsLeft < 0) {
      return (
        <StandardBody>
          <ValidationMessage value={content.messageVal} />
        </StandardBody>
      );
    }
  }

  handleChange(obj) {
    const { value = '' } = obj;
    const charsLeft = calcCharsLeft(this.props.maxChars, value.length);

    this.setState({
      message: value,
      charsLeft,
    });

    this.props.onChange(value, charsLeft);
  }
}

TextAreaWrapper.propTypes = {
  onChange: PropTypes.func,
  maxChars: PropTypes.number.isRequired,
  content: PropTypes.object.isRequired,
  value: PropTypes.string,
  charsLeftDisplayThreshold: PropTypes.number.isRequired,
  rows: PropTypes.number.isRequired,
  cols: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
};

export default TextAreaWrapper;
