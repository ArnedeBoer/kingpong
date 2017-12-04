import React from 'react';
import Input from './Input';
import Match from './Match';

class Profile extends React.Component {
    constructor(props) {
        super();

        this.handleChange = this.handleChange.bind(this);
        this.updateState = this.updateState.bind(this);
        this.updateMatch = this.updateMatch.bind(this);
        this.edit = this.edit.bind(this);

        this.state = {
            username: '',
            password: '',
            usernameValid: true,
            passwordValid: false,
            edit: false,
            error: false,
            matches: []
        };

        this.profileLoad();
        this.matchesLoad();
    }

    updateState(data) {
        this.setState(data);
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    updateMatch(id) {
        const matches = this.state.matches;
        const foundIndex = matches.findIndex(x => x.id === id);
        
        fetch('/api/match/confirm/', {
            method: "POST",
            body: JSON.stringify({id}),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(res => res.json())
        .then(updatedMatch => {
            matches[foundIndex] = updatedMatch;
            matches[foundIndex].id = Math.random(); //read up on immutables

            this.setState({matches: matches});
        })        
    }

    handleSubmit(e) {
        e.preventDefault();
        
        const fields = {
            username: this.state.username,
            password: this.state.password
        }

        fetch(`/api/user/edit/${sessionStorage.getItem('userID')}`, {
            method: "POST",
            body: JSON.stringify(fields),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(res => {
            if(res.status === 201) {
                this.setState({edit: false});
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

    matchesLoad() {
        fetch("/api/match/listmine/", {
            method: "POST",
            body: JSON.stringify({id: sessionStorage.getItem('userID')}),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(res => res.json())
        .then(matches => {
            this.setState({matches});
        });
    }

    edit() {
        this.setState({edit: true})
    }

    renderForm() {
        const formValid = !(this.state.usernameValid && this.state.passwordValid);
        const { username } = this.state;

        return (
            <form id="login-form" onSubmit={(e) => this.handleSubmit(e)}>
                <Input
                    type="text"
                    name="username"
                    title="Username"
                    value={username}
                    updateState={this.updateState}
                />
                <Input
                    type="password"
                    name="password"
                    title="Password"
                    updateState={this.updateState}
                />
                <button className="save" disabled={formValid} onClick={this.save}>Save</button>
            </form>
        )
    }

    renderNormal() {
        const { username } = this.state;

        return (
            <div id="info">
                <span>Username: {username}</span>
                <button className="edit" onClick={this.edit}>Edit</button>
            </div>
        )
    }

    render () {
        return (
            <div id="profile">
                <h2>My Profile</h2>
                { this.state.edit ? this.renderForm() : this.renderNormal() }
                <table>
                    <tbody>
                    <tr>
                        <th>Player One</th>
                        <th>Player Two</th>
                        <th>Score One</th>
                        <th>Score Two</th>
                        <th>Confirmed</th>
                    </tr>
                    {
                        this.state.matches.map((match, index) => {
                            return <Match
                                key={match.id}
                                match={match}
                                index={index}
                                updateMatch={this.updateMatch}
                            />
                        })
                    }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Profile;
