import React from 'react';
import { withRouter } from 'react-router-dom';

export class Main extends React.Component {
	render() {
		return (
			<div>{ this.props.children }</div>
		);
	}
}
export default withRouter(Main);
