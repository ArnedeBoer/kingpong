import React from 'react';
import Input from './Input';
import { Link } from 'react-router-dom';

class Login extends React.Component {
    constructor(props) {
        super();
        
        this.updateState = this.updateState.bind(this);

        this.state = {
            username: '',
            password: '',
            usernameValid: false,
            passwordValid: false,
            error: false
        };
    }

    updateState(data) {
        this.setState(data);
    }

    handleSubmit(e) {
        e.preventDefault();

        const fields = {
            username: this.state.username,
            password: this.state.password
        };

        fetch('/api/user/login', {
            method: "POST",
            body: JSON.stringify(fields),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(res => {
            if(res.status === 200) {
                return res = res.json();
            }

            if(res.status === 400) {
                this.setState({error: true});
            }
        })
        .then(res => {
            sessionStorage.setItem('userID', res.id);
            window.location.replace('/');

        })
    };

    render () {
        const { usernameValid, passwordValid } = this.state;
        const formValid = !(usernameValid && passwordValid);

        return (
            <div id="login">
                <h2>Log in:</h2>
                <form id="login-form" onSubmit={(e) => this.handleSubmit(e)}>
                    <Input
                        type="text"
                        name="username"
                        title="Username"
                        updateState={this.updateState}
                    />
                    <Input
                        type="text"
                        name="password"
                        title="Password"
                        updateState={this.updateState}
                    />
                    <button
                        type="submit"
                        disabled={formValid}
                    >Submit</button>
                </form>
                { this.state.error ? <div className="error">The username or password is not correct.</div> : null }
                <Link to='/register'>Or register</Link>
            </div>
        )
    }
}

export default Login;
