import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './styles/css/style.css';
import Main from './components/Main';
import Login from './components/Login';
import Register from './components/Register';

const Root = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/logout" render={ props => {
                        sessionStorage.clear();
                        window.location.replace('/login');
                    }
                } />
                <Route path="/" render={ props => {
                        if(sessionStorage.getItem("userID") !== null) {
                            return <Main />
                        }

                        window.location.replace('/login');
                    }
                } />

            </Switch>
        </Router>
    )
}

render(<Root/>, document.querySelector('#main'));
