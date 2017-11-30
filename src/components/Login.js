import React from 'react';
import Input from './Input';
import { Link } from 'react-router-dom';

class Login extends React.Component {
    constructor(props) {
        super();

        this.handleChange = this.handleChange.bind(this);
        this.updateState = this.updateState.bind(this);

        this.state = {
            usernameValid: false,
            passwordValid: false
        };
    }

    updateState(data) {
        this.setState(data);
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
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
        .then(res => res.json())
        .then(results => {
            console.log(results);
        });
    };

    render () {
        const { username, password } = this.state;
        const formValid = !(username && password);

        return (
            <div id="login">
                <h2>Log in:</h2>
                <form id="login-form" onSubmit={(e) => this.handleSubmit(e)}>
                    <Input name="username" title="Username" updateState={this.updateState}/>
                    <Input name="password" title="Password" updateState={this.updateState}/>                  
                    <button type="submit" disabled={formValid}>Submit</button>
                </form>
                <Link to='/register'>Or register</Link>
            </div>
        )
    }
}

export default Login;
