import React from 'react';
import Input from './Input';
import { Link } from 'react-router-dom';

class Register extends React.Component {
    constructor(props) {
        super();

        this.handleChange = this.handleChange.bind(this);
        this.updateState = this.updateState.bind(this);

        this.state = {
            username: '',
            password: '',
            passwordConfirm: '',
            usernameValid: false,
            passwordValid: false,
            passwordConfirmValid: false,
            error: false
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

        fetch('/api/user/create', {
            method: "POST",
            body: JSON.stringify(fields),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(res => {
            if(res.status === 201) {
                return res.json()
            } else if (res.status === 400){
                this.setState({error: true});
            }
        })
        .then(res => {
            sessionStorage.setItem("userID", res.id);
            window.location.replace('/profile');
        });
    };

    render () {
        const { usernameValid, passwordValid, passwordConfirmValid } = this.state;
        const formValid = !(usernameValid && passwordValid && passwordConfirmValid);
        const errorMsg = "Username is already used!";

        return (
            <div id="register">
                <h2>Register:</h2>
                <form id="register-form" onSubmit={(e) => this.handleSubmit(e)}>
                    <Input
                        type="text"
                        name="username"
                        title="Username"
                        updateState={this.updateState}
                    />
                    <Input
                        type="password"
                        name="password"
                        title="Password"
                        updateState={this.updateState}
                    />
                    <Input
                        type="password"
                        name="passwordConfirm"
                        title="Confirm password"
                        updateState={this.updateState}
                    />
                    <button
                        type="submit"
                        disabled={formValid}
                    >Submit</button>
                    <br/>
                    {this.state.error ? errorMsg : null}
                </form>
                <Link to='/login'>Or login</Link>
            </div>
        )
    }
}

export default Register;
