import React from 'react';
import Button from './Button';

export type UserData = {
    login: string;
    password: string;
}

type Props = {
    buttonValue: string;
    userData: UserData;
    onUserChange: (data: UserData) => void;
    handleSubmit: () => void;
}

class Form extends React.Component<Props> {
    constructor(props: Props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }

    handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target as HTMLInputElement;
        const { login, password } = this.props.userData;

        if (name === 'login') {
            this.props.onUserChange({
                login: value,
                password: password
            });
        } else if (name === 'password') {
            this.props.onUserChange({
                login: login,
                password: value
            });
        }
    }

    submitForm(event: React.MouseEvent) {
        event.preventDefault();
        this.props.handleSubmit();
    }

    render() {
        const { buttonValue } = this.props;
        const { login, password } = this.props.userData;

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
