import React from 'react';
import Input from './Input';
import Button from './Button';
import Match from './Match';

class Profile extends React.Component {
    constructor(props) {
        super();

        this.handleChange = this.handleChange.bind(this);
        this.updateState = this.updateState.bind(this);
        this.updateMatch = this.updateMatch.bind(this);

        this.state = {
            username: '',
            usernameValid: true,
            button: false,
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

    render () {
        const { username } = this.state;
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
                        this.state.matches.map(match => {
                            return <Match
                                key={match.id}
                                match={match}
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
