import React from 'react';
import Select from 'react-select';

class Input extends React.Component {
    constructor(props) {
        super();

        this.onChange = this.onChange.bind(this);
        this.getOptions = this.getOptions.bind(this);

        this.state = {
            value: {}
        }
    }

    onChange(value) {

        this.props.updateSelectState({
            playerTwo: value === null ? null : value.id,
            playerTwoValid: value !== null
        });

        this.setState({ value });
    }

    getOptions(input) {
        if (!input) {
            return Promise.resolve({ options: null });
        }

        return fetch(`/api/user/filter/${input}`, {
            method: "GET"
        })
        .then(res => res.json())
        .then(results => {
            return { options: results };
        });
    }

    render() {
        const { placeholder, title } = this.props.field;
        const AsyncComponent = Select.AsyncCreatable;

        return (
            <div className="field">
                <label>{title}:</label>
                <AsyncComponent
                    placeholder={placeholder}
                    value={this.state.value}
                    onChange={this.onChange}
                    loadOptions={this.getOptions}
                    valueKey="id"
                    labelKey="username"
                    name="form-field-name"
                />
            </div>
        )
    }
}

export default Input;
