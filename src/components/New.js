import React from 'react';
import Input from './Input';
import Select from './Select';

class New extends React.Component {
    constructor(props) {
        super();
        
        this.updateState = this.updateState.bind(this);
        this.updateSelectState = this.updateSelectState.bind(this);

        this.state = {
            playerOne: localStorage.getItem('hash'),
            playerTwo: null,
            scoreOne: 0,
            scoreTwo: 0,
            playerTwoValid: false,
            scoreOneValid: false,
            scoreTwoValid: false,
            error: false
        };
    }

    handleChange(e) {
        const newValue = e.target.value === '' ? null : e.target.value;
        this.setState({ [e.target.name]: newValue });
    }

    updateSelectState(value) {
        this.setState(value)
    }

    updateState(data) {
        this.setState(data);
    }

    handleSubmit(e) {
        e.preventDefault();

        const fields = {
            playerOne: this.state.playerOne,
            playerTwo: this.state.playerTwo,
            scoreOne: this.state.scoreOne,
            scoreTwo: this.state.scoreTwo
        };

        fetch('/api/match/create', {
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
            window.location.replace('/new');
        })
    };

    render() {
        const { playerTwoValid, scoreOneValid, scoreTwoValid } = this.state;
        const formValid = !(playerTwoValid && scoreOneValid && scoreTwoValid);
        const field = {
            name: 'playerTwo',
            title: 'Opponent',
            type: 'select',
            placeholder: 'Bob, Chris, ...',
            list: 'people-list',
            filter: true
        };

        return (
            <div id="new">
                <h2>New match:</h2>
                <form id="new-form" onSubmit={(e) => this.handleSubmit(e)}>
                    <Select
                        field={field}
                        updateSelectState={this.updateSelectState}
                        handleChange={this.handleChange}
                    />
                    <Input
                        type="number"
                        name="scoreOne"
                        title="Your score"
                        updateState={this.updateState}
                    />
                    <Input
                        type="number"
                        name="scoreTwo"
                        title="Opponents score"
                        updateState={this.updateState}
                    />
                    <button
                        type="submit"
                        disabled={formValid}
                    >Submit</button>
                </form>
                { this.state.error ? <div className="error">The entered data is incorrect.</div> : null }
            </div>
        )
    }
}

export default New;
