import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Main from './Main';
import Login from './Login';
import Register from './Register';

class KingPong extends React.Component {
    render() {
        return (
            <Switch>
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/logout" render={ props => {
                        localStorage.clear();
                        window.location.replace('/login');
                    }
                } />
                <Route path="/" render={ props => {
                        return this.props.session ? <Main /> : <Login />
                    }
                } />
                
            </Switch>

        )
    }
}

export default KingPong;
