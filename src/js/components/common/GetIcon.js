
import React from 'react';

class CommonGetIcon extends React.Component {
   
    render() {
        return (
            <svg role="img" className={this.props.className} viewBox={this.props.viewbox ? this.props.viewbox : "0 0 32 32"} width={this.props.width ? this.props.width : "32px"} height={this.props.height ? this.props.height : "32px"}>
                <use xlinkHref={`${window.baseURl}/images/icons.svg#${this.props.id}`} />
            </svg>
        );
    }
};
export default CommonGetIcon;