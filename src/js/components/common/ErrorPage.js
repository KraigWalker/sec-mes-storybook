import React from 'react';
class ErrorPage extends React.Component{
render(){
    return(<div>
        <h2>Messages</h2><br/>
        <h3>Sorry, there’s been a technical problem</h3><br/>
        <p>It looks like something has gone wrong in the background. Please try again.</p><br/>
        <p>If you’re still having problems, please get in touch.</p>
        <div className="c-btn--group">
            <Link to='/securemessages'>
                <input type='button' name='cancel' value='Back' className="c-btn c-btn--secondary" />
            </Link>
            <button name='Retry' className="c-btn c-btn--default">Retry</button>
        </div>
    </div>);
}
}
export default ErrorPage;