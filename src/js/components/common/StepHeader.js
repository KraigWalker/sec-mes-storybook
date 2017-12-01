import React from 'react';
import { PropTypes } from 'react';
import _ from 'lodash';
import SvgIcon from './GetIcon';
import { Link } from 'react-router-dom';
// import AccessabilityUtils from '../components/common/AccessabilityUtils';

class StepHeader extends React.Component {
	render() {
		return (
		<div className="c-step-header" id={this.props.id ? this.props.id : ""}>
		{this.props.showheaderCrumbs ?	<p className="c-step-header__crumbs">
			<Link to = {this.props.headerCrumbsPath} className="c-step-header__link">
				<SvgIcon id="icon-left" width="16px" height="16px"/>
				<span className="c-step-header__linktext">{this.props.headerCrumbsMessage}</span>
			</Link>
			</p> : null}
			<h1 className="c-step-header__title">{this.props.headerTitle}</h1>
            {this.props.headerSubtitle ? <p className="c-step-header__subtitle">{this.props.headerSubtitle}</p> : null}
			<p className="c-step-header__subtext">{this.props.headerSubtext}</p>
		</div>
		);
	}
}

StepHeader.defaultProps = {
	showheaderCrumbs:true,
	showControl:false,
};
export default StepHeader;