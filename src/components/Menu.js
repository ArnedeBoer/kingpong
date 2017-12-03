import React from 'react';

class Menu extends React.Component {
    render() {
        return (
            <div id="menu">
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/new">Create match</a></li>
                    <li><a href="/profile">Profile</a></li>
                    <li><a href="/logout">Logout</a></li>
                </ul>
            </div>
        )
    }
}

export default Menu;
