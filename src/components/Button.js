import React from 'react';

class Button extends React.Component {
    constructor(props){
        super();

        this.handleButton = this.handleButton.bind(this);

        this.state = {
            type: 'button'
        };
    }

    handleButton(){
        this.props.updateState({
            button: !this.props.buttonType
        })
    }

    render() {

        const buttonType = this.props.buttonType ? "Save" : "Edit";
        const type = this.props.buttonType ? "button" : "submit";
        const { valid } = this.props;

        return (
            <button
                type={type}
                onClick={this.handleButton}
                disabled={valid}
            >
            {buttonType}
            </button>
        )
    }
}

export default Button;
