import { Component } from 'react';
import { Textarea } from 'web-ui-components/lib/atoms/forms';
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
    return (
      <div>
        <Textarea
          onChange={this.handleChange}
          rows={this.props.rows}
          cols={this.props.cols}
          id={this.props.id}
          maxLength="infinity"
          defaultValue={this.props.value}
        />
        {this.renderRemainingChar()}
      </div>
    );
  }

  renderRemainingChar() {
    const { charsLeft } = this.state;
    const { content, charsLeftDisplayThreshold } = this.props;

    if (charsLeft < 0) {
      return (
        <>
          <StandardBody>
            <ValidationMessage
              value={`${charsLeft} ${content.charLeft}`}
              hasIcon={false}
            />
          </StandardBody>
          <StandardBody>
            <ValidationMessage value={content.messageVal} />
          </StandardBody>
        </>
      );
    } else if (charsLeft <= charsLeftDisplayThreshold) {
      return (
        <StandardBody>
          <p>
            {charsLeft} {content.charLeft}
          </p>
        </StandardBody>
      );
    }
  }

  handleChange(e) {
    const value = e.target.value;
    const charsLeft = calcCharsLeft(this.props.maxChars, value.length);

    this.setState({
      message: value,
      charsLeft,
    });

    this.props.onChange(e, charsLeft);
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
