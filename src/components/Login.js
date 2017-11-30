import React from 'react';

class Login extends React.Component {
    render () {
        return (
            <div id="login">
                <form action="" , method="post">
                    <input type="text", name="username", placeholder="Username", autocomplete ='off' required/>
                    <input type="password", name="password", placeholder="Password", required/>
                    <button type="submit">
                </form>
            </div>
        )
    }
}


export default Login;
