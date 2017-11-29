
import React from 'react';

class CommonGetIcon extends React.Component {
   
    render() {
        return (
            <svg className={this.props.className} viewBox="0 0 32 32" width={this.props.width ? this.props.width : "32px"} height={this.props.height ? this.props.height : "32px"}>
                <use xlinkHref={'../../images/icons.svg#' + this.props.id} />
            </svg>
        );
    }
};
export default CommonGetIcon;