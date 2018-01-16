'use restrict';
import React from 'react';
import PropTypes from 'prop-types';

class CalloutComponent extends React.Component {
 componentWillMount() {
	}
	componentDidMount() {

	}
	componentWillReceiveProps(newProps) {

	}
	shouldComponentUpdate(newProps, newState) {
		return true;
	}
	componentWillUpdate(nextProps, nextState) {

	}
	render() {
		return (
			<div className={this.props.dClass}>
				<p className={this.props.pClass}>{this.props.paraText}</p>
			</div>
		);
	}
}
CalloutComponent.propTypes = {
	dClass: PropTypes.string,
	selectComponent: PropTypes.func,
	pclass: PropTypes.string,
	paraText: PropTypes.string,
}
CalloutComponent.defaultProps = {
	dClass: 'callout',
	pClass: '',
//	selectComponent: function(e) {return null},
	paraText: 'Contrary to popular belief, Lorem Ipsum is not random text. It has roots in a piece of classical Latin literature from 45 BC, making it 2000 years old.',
}

export default CalloutComponent;