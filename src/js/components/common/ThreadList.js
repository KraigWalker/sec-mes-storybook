
import React from 'react';
import _ from 'lodash';
import Thread from './ThreadsComponent';

class ThreadList extends React.Component {
    getThreadList() {
        const { Threads } = this.props;
        const allThreads = [];
        _.map(Threads, (thread, index) => {
            allThreads.push(<Thread ThreadDetail={ thread } key={index}/>)
        })
        return allThreads;
    }
    render() {
        return (
            <div>
                {this.getThreadList()}
            </div>
        );  
    }
};
export default ThreadList;