import React from 'react';
import Match from './Match';

class Home extends React.Component {
    constructor(props) {
        super();

        this.state = {
            matches: []
        };

        this.matchesLoad();
    }

    matchesLoad() {
        fetch("/api/match/list/confirmed/", {
            method: "GET"
        })
        .then(res => res.json())
        .then(matches => {
            this.setState({matches});
        });
    }

    render() {
        return (
            <div id="home">
                <h2>All matches</h2>
                <table>
                    <tbody>
                    <tr>
                        <th>Player One</th>
                        <th>Player Two</th>
                        <th>Score One</th>
                        <th>Score Two</th>
                    </tr>
                    {
                        this.state.matches.map((match, index) => {
                            return <Match
                                key={match.id}
                                match={match}
                                index={index}
                            />
                        })
                    }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Home;
