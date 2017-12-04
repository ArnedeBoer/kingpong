import React from 'react';

class New extends React.Component {
    constructor() {
        super();

        this.handleChange = this.handleChange.bind(this);

        this.state = {
            error: false
        };
    }

    handleChange(e) {
        const value = e.target.value;
        const lengthValid = value.length >= 8;
        const fieldStatusName = `${[e.target.name]}Valid`;
        const numberValid = typeof Number(value) === 'number' && value >= 0;
        let passwordValid = true;
        let error = false;

        if(this.props.name === 'passwordConfirm') {
            passwordValid = e.target.value === document.getElementById('password').value;
        }

        const checks = this.props.type === 'number' ? numberValid : lengthValid && passwordValid;

        error = !(checks);

        this.setState({ error })

        this.props.updateState({
            [fieldStatusName]: !error,
            [e.target.name]: e.target.value
        });
    }

    render() {
        const { name, title, type } = this.props;
        const nameLc = name.toLowerCase();
        const tooltipText = nameLc === 'passwordconfirm' ? 'The passwords do not match.' : `The ${nameLc} must be at least 8 characters long`;
        const value = this.props.value;

        return (
            <div className="input">
                <label>{title}:</label>
                <input
                    type={type}
                    id={name}
                    name={name}
                    placeholder={title}
                    autoComplete='off'
                    onChange={this.handleChange}
                    value={value}
                    required
                />
                <div className="tooltip" hidden={true}>
                    { this.state.error ? <span>&#9432;</span> : null }
                    <span className="tooltiptext">{ tooltipText }</span>
                </div>
            </div>
        )
    }
}

export default New;
