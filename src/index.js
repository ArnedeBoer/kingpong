import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import './styles/css/style.css';
import KingPongSuper from './components/KingPongSuper';

const Root = () => {
    return (
        <Router>
            <KingPongSuper />
        </Router>
    )
}

render(<Root/>, document.querySelector('#main'));
