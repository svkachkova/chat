import React from 'react';
import Button from './Button';

interface Props {
    buttonText: string;
    buttonLink: string;
    handleSubmit: (data: State) => void;
}

export interface State {
    login: string;
    password: string;
}

const initialState: State = {
    login: '',
    password: ''
};

class Form extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = initialState;

        this.handleChange = this.handleChange.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }

    handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target as HTMLInputElement;

        this.setState(state => ({
            ...state,
            [name]: value
        }));
        // this.setState({
        //     [name]: value
        // } as Pick<State, keyof State>);
    }

    submitForm(event: React.MouseEvent) {
        // event.preventDefault;
        this.props.handleSubmit(this.state);
        this.setState(initialState);
    }
    
    render() {
        const { buttonText, buttonLink } = this.props;

        return (
            <form>
                <label>
                    Login: 
                    <input 
                        type="text" 
                        name="login"
                        value={this.state.login}
                        placeholder="Login"
                        onChange={this.handleChange}
                    />
                </label>
                <label>
                    Password: 
                    <input
                        type="password"
                        name="password"
                        value={this.state.password}
                        placeholder="Password"
                        onChange={this.handleChange}
                    />
                </label>
                <Button 
                    text={buttonText} 
                    link={buttonLink}
                    onClick={this.submitForm}
                />
            </form>
        );
    }
};

export default Form;
