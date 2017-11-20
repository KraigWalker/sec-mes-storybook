import React from 'react';
import { Link } from 'react-router-dom';

class TextAreaComponent extends React.Component{
    constructor(props) {
        super(props);
        this.textChange = this.textChange.bind(this);
        this.sendData = this.sendData.bind(this);
        this.state = {
            messageText : '',
        }
    }
    textChange(e) {
        // console.log('text changes',e.target.value);
        this.setState({messageText : e.target.value});
    }
    sendData(){
        this.props.sendData(this.state.messageText);
    }
    render() {
        return (<div>
            <input type = 'text' name = 'txtbox'onChange = {this.textChange}/><br/><br/>
            <Link to='/securemessages'>
            <input type = 'button' name = 'cancel' value = 'Back'/>
            </Link>
            <input type = 'button' name = 'Save Draft' value = 'Save Draft'/>
            <input type = 'button' name = 'Send' value = 'Send' onClick ={this.sendData}/>
        </div>);
    }
}
export default TextAreaComponent;