import React from 'react';
import { Link } from 'react-router-dom';
import autosize from 'autosize';

class TextAreaComponent extends React.Component {
    constructor(props) {
        super(props);
        this.textChange = this.textChange.bind(this);
        this.check = this.check.bind(this);
        this.state = {
            textLength: 0,
        }
    }
    componentDidMount(){
        if(this.props.isFromDraft) {
            this.refs.txtarea.value = this.props.draftData;
            this.props.textData(this.props.draftData);
        } else this.refs.txtarea.value = '';
    }
    textChange(e) {
        autosize(document.getElementById('message'));
        this.props.textData(e.target.value);
    }
    check(e) {
        // this.props.pastedData(e.clipboardData.getData('Text'));
    }
    render() {
        return (
            <textarea className="c-field__input c-field__input--txtarea"
                name="message"
                id="message"
                rows="10"
                cols="20"
                onChange={this.textChange}
                onPaste={this.check}
                value={this.props.messageBody}
                disabled={this.props.disableText}
                maxLength='43'
                ref="txtarea">
            </textarea>
        );
    }
}
export default TextAreaComponent;