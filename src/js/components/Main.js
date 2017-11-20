import React from 'react';

class Main extends React.Component {
    render() {
        return (
            <div>
                <div>{ this.props.children }</div>
        </div>);
    }
}

export default Main;