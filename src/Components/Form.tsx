import React from 'react';
import Button from './Button';

interface Props {
    buttonValue: string;
    handleSubmit: () => void;
}

interface State {
    login: string;
    password: string;
}

class Form extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            login: '',
            password: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }

    handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target as HTMLInputElement;
        const { login, password } = this.props.userData;

        this.setState(state => ({
            ...state,
            [name]: value
        }));

        // this.setState({
        //     [name]: value
        // } as Pick<State, keyof State>);
    }

    submitForm(event: React.MouseEvent) {
        event.preventDefault();
        this.props.handleSubmit();
    }

    render() {
        const { buttonValue } = this.props;
        const { login, password } = this.state;

        return (
            <form>
                <label>
                    Login: 
                    <input 
                        type='text' 
                        name='login'
                        value={login}
                        placeholder='Login'
                        onChange={this.handleChange}
                    />
                </label>
                <label>
                    Password: 
                    <input
                        type='password'
                        name='password'
                        value={password}
                        placeholder='Password'
                        onChange={this.handleChange}
                    />
                </label>
                <Button 
                    value={buttonValue} 
                    onClick={this.submitForm}
                />
            </form>
        );
    }
};

export default Form;
