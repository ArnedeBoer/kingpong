import React from 'react';
import Match from './Match';
import Ads from './Ads';

class Home extends React.Component {
    constructor(props) {
        super();

        this.state = {
            matches: [],
            mvp: {}
        };

        this.getMvp();
        this.matchesLoad();
    }

    getMvp() {
        fetch("/api/match/mvp/", {
            method: "GET"
        })
        .then(res => res.json())
        .then(mvp => {
            this.setState({mvp});
        });
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
        const { name, score } = this.state.mvp;

        return (
            <div id="home">
                <Ads />
                <h2>Most matches won: {name} (Wins: {score})</h2>

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
