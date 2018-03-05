
import React from 'react';
import icons from '../../../images/icons.svg';

class CommonGetIcon extends React.Component {
   
    render() {
        return (
            <svg role="img" className={this.props.className} viewBox="0 0 32 32" width={this.props.width ? this.props.width : "32px"} height={this.props.height ? this.props.height : "32px"}>
                <use xlinkHref={`${icons}#` + this.props.id} />
            </svg>
        );
    }
};
export default CommonGetIcon;