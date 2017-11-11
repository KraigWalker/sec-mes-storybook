import React from 'react';
import { connect } from 'react-redux';


class Main extends React.PureComponent {
    render() {
        return (
            <div>
                <h1>
                Secure Message Web App
                </h1>
            <div>
                { this.props.children }
            </div>
        </div>);
    }
}

const mapState = (state) => {
    return state
} 

export default connect(mapState)(Main);