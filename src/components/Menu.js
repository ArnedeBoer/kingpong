import React from 'react';

class Menu extends React.Component {
    render() {
        return (
            <div id="menu">
                <ul>
                    <li><a href="/">Create match</a></li>
                    <li><a href="/profile">Profile</a></li>
                    <li><a href="/login">Logout</a></li>
                </ul>
            </div>
        )
    }
}

export default Menu;
