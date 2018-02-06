import React from 'react';
import { Link } from 'react-router-dom';
class ErrorPage extends React.Component{
render() {
    return(<div className="container"> 
    <div className="row">
    <div className="col-md1-18">
        <h2>Messages</h2><br/>
        <h3>Sorry, there’s been a technical problem</h3><br/>
        <p>It looks like something has gone wrong in the background. Please try again.</p><br/>
        <p>If you’re still having problems, please get in touch.</p>
        <div className="c-btn--group">
                <Link to='/securemessages'>
            <button name='Retry' className="c-btn c-btn--default">Retry</button>
            </Link>
        </div>
    </div>
    </div>
    </div>);
}
}
export default ErrorPage;