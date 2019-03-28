import React from 'react';
import autosize from 'autosize';
import { Textarea } from 'web-ui-components/lib/atoms/forms';

class TextAreaComponent extends React.Component {
    constructor(props) {
        super(props);
        this.textChange = this.textChange.bind(this);
        this.setTextInputRef = element => {
            this.textInput = element;
        };
    }
    componentDidMount() {
        if (this.props.draftData) {
            this.textInput.value = this.props.draftData;
            this.props.textData(this.props.draftData);
        }
    }
    textChange(e) {
        autosize(document.getElementById('message'));
        this.props.textData(e.target.value);
    }
    render() {
        return (
            <Textarea 
                name="message"
                id="message"
                rows="10"
                cols="20"
                onChange={this.textChange}
                onPaste={this.check}
                value={this.props.message}
                disabled={this.props.disableText}
                maxLength='infinity'
                ref={this.setTextInputRef}
                aria-labelledby={`${this.props.accessID}`}
                aria-describedby={this.props.ariaId}
            >
            </Textarea>
        );
    }
}
TextAreaComponent.defaultProps = {
    ariaId: '',
}
export default TextAreaComponent;