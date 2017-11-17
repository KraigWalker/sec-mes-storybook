import React from 'react';
import { PropTypes } from 'react';
import _ from 'lodash';
import SvgIcon from './GetIcon';
// import AccessabilityUtils from '../components/common/AccessabilityUtils';

class StepHeader extends React.Component {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}
	componentWillMount() {
	}
	componentDidMount() {
		//AccessabilityUtils.focusOnFirstComponent(this.refs.accessH1ID);
	}
	componentWillUnmount() {
	}
	handleClick(e) {
		e.preventDefault();
		if (this.props.onClick) {
			this.props.onClick();
		}
	}
	getSubtext(){
		let subText = [];
		_.map(this.props.headerSubtext, (item, index) => {
			subText.push(<p className="c-step-header__subtext" dangerouslySetInnerHTML={{ __html: item }} ></p>);
		});
		return subText;
	}
	render() {
		return (
		<div className="c-step-header" id={this.props.id ? this.props.id : ""}>
		{this.props.showheaderCrumbs ?	<p className="c-step-header__crumbs">
				<a className="c-step-header__link" href="#" onClick={this.handleClick}>
					<span className="icon icon-page-back c-step-header__linkicon" aria-hidden="true"></span>
					<span className="c-step-header__linktext">{this.props.headerCrumbsMessage}</span>
				</a>
			</p> : null}
			{/* <h1 id="accessH1ID" ref = "accessH1ID" tabIndex = "0" className="c-step-header__title">{this.props.headerTitle}</h1> */}
			
			<h1 className="c-step-header__title">{this.props.headerTitle}</h1>
            {this.props.headerSubtitle ? <p className="c-step-header__subtitle">{this.props.headerSubtitle}</p> : null}
			{this.props.headerSubtext ? this.getSubtext() : null}
			{ this.props.showControl ? <div className="c-step-header__controls">
						<button className="c-btn c-btn--link c-btn--link-icon c-step-header__control" onClick={this.props.controlBack}><span className="u-visually-hidden off-screen">Previous</span><span className="icon-swipe-left" aria-hidden="true"></span></button>
						<button className="c-btn c-btn--link c-btn--link-icon c-step-header__control" onClick={this.props.controlForward}><span className="u-visually-hidden off-screen">Next</span><span className="icon-swipe-right" aria-hidden="true"></span></button>
                    <button className="refresh-btn c-btn c-btn--link c-btn--link-icon c-step-header__control" onClick={this.props.controlRefresh}>
                        {<SvgIcon id="icon-refresh-large" width="24px" height="24px"/>}
                        <span className="u-visually-hidden off-screen">Refresh</span>
                    </button>
					</div> : null }
		</div>
		);
	}
}

StepHeader.defaultProps = {
	showheaderCrumbs:true,
	showControl:false,
};
export default StepHeader;