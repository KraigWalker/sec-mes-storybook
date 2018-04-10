// Note: pass IconFlag as false if there is no need for icons on Tab.

import React from 'react';
import { Tabs, Tab, Grid, Row, Col } from 'react-bootstrap';
class GetTabs extends React.Component {
	constructor(props) {
		super(props);
		this.handleSelect1 = this.handleSelect1.bind(this);
		this.handleSelect2 = this.handleSelect2.bind(this);
		this.getTab = this.getTab.bind(this);
		this.state = { key1: 1, key2: 1 };
	}
	getTab(icon) {
		let tabItem;
		const tabsObject = [];
		if (this.props.titleName.length > 0) {
			for (let i = 0; i < this.props.titleName.length; i++) {
				let titleElement = <div>{icon ? (<span className={this.props.icon[i]} aria-hidden="true"></span>) : ''}<div>{this.props.titleName[i]}</div></div>;
				tabItem = <Tab eventKey={i + 1} title={titleElement}>{this.props.tabContent[i]}</Tab>;
				tabsObject.push(tabItem);
			}
			return tabsObject;
		}
	}

	handleSelect1(key) {
		this.setState({ key1: key });
	}

	handleSelect2(key) {
		this.setState({ key2: key });
	}

	render() {
		return (
			<div>
				{!this.props.IconFlag ?
				(
					<Tabs activeKey={this.state.key1} onSelect={this.handleSelect1} className="c-scroll-tabs">
						{this.getTab(this.props.IconFlag)}
					</Tabs>
				) :
				(
					<Tabs activeKey={this.state.key2} onSelect={this.handleSelect2} className="c-scroll-tabs c-scroll-tabs--icon">
						{this.getTab(this.props.IconFlag)}
					</Tabs>
				)}
			</div>
		);
	}
}

GetTabs.propTypes = {
	icon: React.PropTypes.array,
	titleName: React.PropTypes.array,
	tabContent: React.PropTypes.array,
	IconFlag: React.PropTypes.boolean,
};
GetTabs.defaultProps = {
	icon: ['glyphicon glyphicon-remove', 'glyphicon glyphicon-remove', 'glyphicon glyphicon-star', 'glyphicon glyphicon-remove', 'glyphicon glyphicon-remove'],
	titleName: ['More than one word Tab', 'Tab2', 'Tab3', 'Tab4', 'Tab5'],
	tabContent: ['Default_Props Tab1 Content', 'Tab2 Content', 'Tab3 Content', 'Tab4 Content', 'Tab5 content'],
	IconFlag: true,
};

export default GetTabs;