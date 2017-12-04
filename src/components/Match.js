import React from 'react';

class Match extends React.Component {
    constructor(props) {
        super(props);

        this.updateMatch = this.updateMatch.bind(this);

        const { playerOne, playerTwo, scoreOne, scoreTwo, confirmed } = props.match;

        this.state = {
            playerOne: playerOne,
            playerTwo: playerTwo,
            scoreOne: scoreOne,
            scoreTwo: scoreTwo,
            confirmed: confirmed
        };
    }

    updateMatch() {
        this.props.updateMatch(this.props.match.id);
    }

    render() {
        const { playerOne, playerTwo, scoreOne, scoreTwo, confirmed } = this.state;
        const matchID = playerTwo !== Number(sessionStorage.getItem('userID'));

        return (
            <tr className={this.props.index % 2 ? 'match light' : 'match'}>
                <td>{playerOne}</td>
                <td>{playerTwo}</td>
                <td>{scoreOne}</td>
                <td>{scoreTwo}</td>
                <td>{ confirmed || matchID ? null : <button onClick={this.updateMatch}>Confirm</button> }</td>
            </tr>
        )
    }
}

export default Match;
