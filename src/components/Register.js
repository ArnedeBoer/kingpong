import React from 'react';

class Register extends React.Component {
    render () {
        return (
            <div id="register">
                <form action="" , method="post">
                    <input type="text", name="username", placeholder="Username", autocomplete ='off' required/>
                    <input type="password", name="password", placeholder="Password", required/>
                    <input type="password", name="passwordConf", placeholder="Confirm password", required/>
                    <button type='submit'>
                </form>
            </div>
        )
    }
}

export default Register;
