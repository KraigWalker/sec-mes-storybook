import React from 'react';
import { PropTypes } from 'react';


class ButtonComponent extends React.Component {
    buttonClick = () => {
      if(this.props.navigate){
        this.props.navigate && this.props.history.push(this.props.routeHandler);
      } else{
        this.props.buttonClick();
      }  
    }
    render = () => {
        return (
        <button type="button" className={this.props.className} onClick = {this.buttonClick}>{this.props.buttonName}</button>
        );
    }
}

export default ButtonComponent;
