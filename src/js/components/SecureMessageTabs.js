import React from 'react';
import { Tabs, Tab, Grid, Row, Col } from 'react-bootstrap';
import Inbox from './Inbox';
let titleName = ['Inbox', 'Drafts', 'Sent'];
// import Tab from 'react-bootstrap/lib/Tab';
class SecureMessageTabs extends React.Component {
	constructor(props) {
		super(props);
		this.handleSelect1 = this.handleSelect1.bind(this);
		this.state = { key1: 1, key2: 1 };
	}

	componentWillMount() {
		// mounted before rendering
	}
	componentDidMount() {
		// executed after first render
		// ajax calls, action calls, should be called here.
        /** other life cycle methods can be triggered by
        setting the state here (applied to state full component)
        */
	}

	componentWillReceiveProps(newProps) {
		// when the props are updated, this method is invoked before the render of the component.
	}
	shouldComponentUpdate(newProps, newState) {
		// returns boolean value.
		// returns true by default.
		// if there is no needed to re-render even after the state or props updated, then return false
		return true;
	}
	componentWillUpdate(nextProps, nextState) {
		// called before rendering
	}
	componentDidUpdate(prevProps, prevState) {
	}
	componentWillUnmount() {
		// its an unmounting fron the dom
	}

	getTabContent(data) {
		
		const tabContent = [];
		if (data) {
			_.map(data, (item,index) => {
				tabContent.push(<Inbox messages={item}/>);
			});
			return tabContent;
		}
	}

	handleSelect1(key) {
		this.setState({ key1: key });
	}

	render() {
		const { messages } = this.props.location? this.props.location.state : this.props.messages;
		return (
			<div>
				<Tabs activeKey={this.state.key1} onSelect={this.props.onClick} className="c-scroll-tabs">
					<Tab eventKey={'inbox'} title={<div>{titleName[0]}</div>}>
                        <Inbox messages={messages? messages : null}/>
					</Tab>
					<Tab eventKey={'draft'} title={<div>{titleName[1]}</div>}>
					</Tab>
					<Tab eventKey={'sent'} title={<div>{titleName[2]}</div>}>
					</Tab>
				</Tabs>
			</div>
		);
	}
}

SecureMessageTabs.propTypes = {
	
};
SecureMessageTabs.defaultProps = {
	
};

module.exports = SecureMessageTabs;