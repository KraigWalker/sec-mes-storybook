import React from 'react';

class Main extends React.Component {
    render() {
        console.log(this.props)
        return (
            <div>
                <div>{ this.props.children }</div>
        </div>);
    }
}

export default Main;