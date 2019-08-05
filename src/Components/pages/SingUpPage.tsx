import React from 'react';
import { Link } from 'react-router-dom';
import Form, { State as UserData } from '../Form';

interface State {
    userIsCreated: boolean;
}

class SingUpPage extends React.Component<{}, State> {
    constructor(props: {}) {
        super(props);
        this.state = {
            userIsCreated: false
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(data: UserData) {
        const url: string = `http://192.168.1.2:3912/api/createUser?login=${data.login}&password=${data.password}`;
        const options: RequestInit = {
            method: 'GET',
            mode: 'cors',
        };
    
        fetch(url, options)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Network response was not ok.');
            })
            .then(serverResponse => {
                if (serverResponse.status) {
                    this.setState({
                        userIsCreated: true
                    });
                } else {
                    console.log(serverResponse.message);
                }
            })
            .catch(error => console.log(error.message));
    }

    render() {
        return (
            <div>
                <h1>Get started</h1>
                <p>
                    Already have an account
                    ? <Link to='/loggin'>
                        Login
                    </Link>
                </p>
                <Form 
                    buttonText='Join'
                    handleSubmit={this.handleSubmit}
                />
            </div>
        );
    }
};

export default SingUpPage;
