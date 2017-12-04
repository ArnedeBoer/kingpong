import React from 'react';

class MyMatch extends React.Component {
    constructor(props) {
        super(props);

        this.updateMatch = this.updateMatch.bind(this);

        const { playerOneMatches, playerTwoMatches, scoreOne, scoreTwo, confirmed } = props.match;

        this.state = {
            playerOne: playerOneMatches,
            playerTwo: playerTwoMatches,
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
        const mineToConfirm = playerTwo.id !== Number(sessionStorage.getItem('userID'));
        const getConfirmContent = () => {
            let toReturn;

            if(confirmed) {
                toReturn = null
            } else if (mineToConfirm) {
                toReturn = <button onClick={this.updateMatch}>Confirm</button>
            } else {
                toReturn = <span>Unconfirmed</span>
            }

            return toReturn;
        };

        return (
            <tr className={this.props.index % 2 ? 'match light' : 'match'}>
                <td>{playerOne.username}</td>
                <td>{playerTwo.username}</td>
                <td>{scoreOne}</td>
                <td>{scoreTwo}</td>
                <td>{ getConfirmContent() }</td>
            </tr>
        )
    }
}

export default MyMatch;
