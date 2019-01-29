import React from 'react';
import { withRouter, Link } from 'react-router-dom';

export class Main extends React.Component {
	render() {
		return (
			<div className="container">
				<div className="row tab-container">
                	<div className="col-md1-24 col-sm1-24 col-lg1-24">
						<Link className="c-btn c-btn--secondary tab-button" to={`${window.baseURl}/securemessages`}>Secure Messages</Link>
						<Link className="c-btn c-btn--secondary tab-button" to={`${window.baseURl}/my-documents`}>Document portal</Link>
					</div>
				</div>
				{ this.props.children }
			</div>
		);
	}
}
export default withRouter(Main);
