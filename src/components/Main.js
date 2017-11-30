import React from 'react';
import { Route } from 'react-router-dom';
import Menu from './Menu';
import Home from './Home';
import New from './New';
import Profile from './Profile';

class Main extends React.Component {
    render() {
        return (
            <div id="main">
                <Menu />
                <Route exact path="/" component={Home} />
                <Route exact path="/new" component={New} />
                <Route exact path="/profile" component={Profile} />
            </div>
        )
    }
}

export default Main;
