import React from 'react';
import { Link } from 'react-router-dom';
import Form, { State as UserData } from '../Form';

interface State {
    isLoggin: boolean;
    accessToken: string;
}

class LogInPage extends React.Component<{}, State> {
    constructor(props: {}) {
        super(props);
        this.state = {
            isLoggin: false,
            accessToken: ''
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(data: UserData) {
        
        const url: string = `http://192.168.1.2:3912/api/login?login=${data.login}&password=${data.password}`;
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
                       isLoggin: true,
                       accessToken: serverResponse.token
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
                <h1>Log in</h1>
                <p>
                    Don't have an account
                    ? <Link to='/signup'>
                    Get started
                    </Link>
                </p>
                <Form 
                    buttonText='Login'
                    handleSubmit={this.handleSubmit}
                />
            </div>
        );
    }
};

export default LogInPage;
