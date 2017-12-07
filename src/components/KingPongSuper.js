import React from 'react';
import KingPong from './KingPong';

class KingPongSuper extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            session: false
        };
    }

    componentDidMount() {
        return fetch('/api/user/hash/', {
            method: "POST",
            body: JSON.stringify({hash: localStorage.getItem('hash')}),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(results => {
            if (results.status === 201) {
                this.setState({session: true})
            }
        });
    }

    render() {
        return (
            <KingPong session={this.state.session}/>
        )
    }
}

export default KingPongSuper;
