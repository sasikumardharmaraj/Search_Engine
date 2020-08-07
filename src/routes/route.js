import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import HomePage from '../container/homePage';

const Routes = () => (
    <Router>
        <Switch>
            <Route exact path="/" component={HomePage} />
            <Redirect from="*" to="/" />
        </Switch>
    </Router>

);
export default Routes;