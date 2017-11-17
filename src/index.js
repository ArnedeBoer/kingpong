import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Match, Miss } from 'react-router';

import './styles/css/style.css';
import Menu from './components/Menu';
import Main from './components/Main';
import Profile from './components/Profile';
import NotFound from './components/NotFound';

const Root = () => {
    return (
        <BrowserRouter>
            <div>
                <Menu />
                <Match exactly pattern="/" component={Main} />
                <Match exactly pattern="/profile" component={Profile} />
                <Miss component={NotFound} />
            </div>
        </BrowserRouter>
    )
}

render(<Root/>, document.querySelector('#main'));
