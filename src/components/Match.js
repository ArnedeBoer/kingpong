import React from 'react';

class MyMatch extends React.Component {
    render() {
        const { playerOneMatches, playerTwoMatches, scoreOne, scoreTwo } = this.props.match;

        return (
            <tr className={this.props.index % 2 ? 'match light' : 'match'}>
                <td>{playerOneMatches.username}</td>
                <td>{playerTwoMatches.username}</td>
                <td>{scoreOne}</td>
                <td>{scoreTwo}</td>
            </tr>
        )
    }
}

export default MyMatch;
