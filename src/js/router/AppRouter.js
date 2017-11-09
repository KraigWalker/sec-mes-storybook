import { Switch, BrowserRouter, Route } from 'react-router-dom';
import React from 'react';
import SecureMessageLanding from '../components/SecureMessageLanding.jsx';

class AppRouter {
    static init() {
        return (
        <BrowserRouter>
          <Switch>
            <Route path = '/' exact component = { SecureMessageLanding }/>
          </Switch>
        </BrowserRouter>);
    }
}

export default AppRouter;
