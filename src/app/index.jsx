import React from 'react';
import {render} from 'react-dom';
import {Router, Route, hashHistory} from 'react-router';
import Template from './template/Template';
import Home from './pages/Home';
import Login from './pages/Login';

class App extends React.Component {
    render() {
        return (
            <Router history={hashHistory}>
                <Route component={Template}>
                    <Route path="/" component={Home}/>
                    <Route path="/login" component={Login}/>
                </Route>
            </Router>
        );
    }
}

render(<App/>, document.getElementById('app'));