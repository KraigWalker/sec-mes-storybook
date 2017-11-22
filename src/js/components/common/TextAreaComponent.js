import React from 'react';
import { Link } from 'react-router-dom';
// import autosize from 'autosize';

class TextAreaComponent extends React.Component{
    constructor(props) {
        super(props);
        this.textChange = this.textChange.bind(this);
        this.check = this.check.bind(this);
        this.state = {
            textLength : 0,
        }
    }
    textChange(e) {
       //  autosize(document.getElementById('ta1'));
        this.props.textData(e.target.value);
    }
    check(e) {
       this.props.pastedData(e.clipboardData.getData('Text'));
       console.log('paste:',e.clipboardData.getData('Text'))
    }
    textLength() {

    }
    render() {
        return (
            <div className="c-field">
{/*                         <label className="c-field__label c-field__label--block" htmlFor="ta1">
                            Message
                        </label>
                        <div className="c-field__controls">
                            <textarea className="c-field__input c-field__input--txtarea" name="ta1" id="ta1" rows="10" cols="20" onChange={this.textChange} onPaste = {this.check}></textarea>
                        </div> */}
<input type = 'text' ref = 'inputText' name = 'txtbox'onChange = {this.textChange} onPaste = {this.check}/><br/><br/>
                    </div>
             
        );
    }
}
export default TextAreaComponent;