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
            passwordConfirmValid: false
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
        .then(res => res.json())
        .then(results => {
            console.log(results);
        });
    };

    render () {
        const { usernameValid, passwordValid, passwordConfirmValid } = this.state;
        const formValid = !(usernameValid && passwordValid && passwordConfirmValid);

        return (
            <div id="register">
                <h2>Register:</h2>
                <form id="register-form" onSubmit={(e) => this.handleSubmit(e)}>
                    <Input name="username" title="Username" updateState={this.updateState}/>
                    <Input name="password" title="Password" updateState={this.updateState}/>
                    <Input name="passwordConfirm" title="Confirm password" updateState={this.updateState}/>                    
                    <button type="submit" disabled={formValid}>Submit</button>
                </form>
                <Link to='/login'>Or login</Link>
            </div>
        )
    }
}

export default Register;
