import React from 'react';


class Main extends React.Component {
    render() {
        return (
            <div>
                <h1>
                React redux Web App
                </h1>
            <div>
                <div>{ this.props.children }</div>
            </div>
        </div>);
    }
}

export default Main;