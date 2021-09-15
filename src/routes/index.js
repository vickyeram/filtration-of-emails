import React from 'react'
import { Switch, Redirect, Route, Router } from "react-router-dom";
import history from '../common/history';
import { Leads, Login, Overview } from '../views';

function Routes() {
    return (
        <Router history={history} >
            <Switch>
                <Route exact path="/" component={Login} />
                <Route exact path="/leads" component={Leads} />
                <Route exact path="/overview" component={Overview} />
            </Switch>
        </Router>
    )
}

export default Routes
