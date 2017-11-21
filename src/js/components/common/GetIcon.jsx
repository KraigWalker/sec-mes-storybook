

import React from 'react';

class SvgIcon extends React.Component {
    constructor(props) {
		super(props);
		this.getContent = this.getContent.bind(this);
	}

    getContent(){
        let svgContent ;
       
        svgContent = <svg role="img" aria-hidden="true" className={this.props.className?this.props.className:""} viewBox="0 0 32 32" width={this.props.width ? this.props.width : "32px"} height={this.props.height ? this.props.height : "32px"}>
                <use xlinkHref={'../images/bow/bow-sprite.svg#' + this.props.id} />
            </svg>;
        
        return svgContent;
    }
    render() {
        return (
            this.getContent()
        );
    }
};
module.exports = SvgIcon;
