
import React from 'react';
import _ from 'lodash';
import Thread from './ThreadsComponent';

class ThreadList extends React.Component {
    getThreadList() {
        const { Threads } = this.props;
        const allThreads = [];
        if(this.props.isFromReplyMessage) {
            allThreads.push(<Thread ThreadDetail={ this.props.currentMessage } key={0}/>)
        }
        _.map(Threads, (thread, index) => {
            allThreads.push(<Thread ThreadDetail={ thread } key={index+1}/>)
        })
        return allThreads;
    }
    render() {
        return (
            <section>
                <ol className="c-messagelist">
                    {this.getThreadList()}
                </ol>
            </section>
        );  
    }
};
export default ThreadList;