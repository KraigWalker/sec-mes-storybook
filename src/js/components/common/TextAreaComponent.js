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
        return (<div>
            <input type = 'text' name = 'txtbox'onChange = {this.textChange}/><br/><br/>
        </div>);
    }
}
export default TextAreaComponent;