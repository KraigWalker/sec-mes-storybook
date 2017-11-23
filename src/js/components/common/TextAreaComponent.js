import React from 'react';
import { Link } from 'react-router-dom';

class TextAreaComponent extends React.Component{
    constructor(props) {
        super(props);
        this.textChange = this.textChange.bind(this);
    }
    textChange(e) {
        this.props.textData(e.target.value);
    }
    render() {
        return (
            <textarea className="c-field__input c-field__input--txtarea" 
                name="message" 
                id="message" 
                rows="10" 
                cols="20" 
                onChange={this.textChange}>
            </textarea>
        );
    }
}
export default TextAreaComponent;