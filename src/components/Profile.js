import React from 'react';
import Input from './Input';
import Button from './Button';

class Profile extends React.Component {
    constructor(props) {
        super();

        this.handleChange = this.handleChange.bind(this);
        this.updateState = this.updateState.bind(this);

        this.state = {
            username: '',
            usernameValid: true,
            button: false,
            error: false
        };

        this.profileLoad();
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
        }

        fetch('/api/user/edit/' + sessionStorage.getItem("userID"), {
            method: "POST",
            body: JSON.stringify(fields),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(res => {
            if(res.status === 201) {
                window.location.replace('/profile');
            }
        });
    }

    profileLoad() {
        fetch("/api/user/" + sessionStorage.getItem("userID"), {
            method: "GET"
        })
        .then(res => {
            if(res.status === 200) {
                return res.json();
            } else {
                window.location.replace('/');
            }
        })
        .then(user => this.setState({
            username: user.username
        }))
    }

    render () {
        const { username }= this.state;
        const formValid = !(this.state.usernameValid);

        return (
            <div id="profile">
                <h2>My Profile</h2>
                <form id="login-form" onSubmit={(e) => this.handleSubmit(e)}>
                    { this.state.button
                        ? <Input name="username" title="Username" value={username} updateState={this.updateState}/>
                        : <h3>{username}</h3>
                    }
                    <Button buttonType={this.state.button} onClick={this.handleEdit} valid={formValid} updateState={this.updateState}/>
                </form>
            </div>
        )
    }
}

export default Profile;
