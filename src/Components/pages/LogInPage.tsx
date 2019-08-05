import React from 'react';
import { Link } from 'react-router-dom';
import Form, { State as UserData } from '../Form';

const LogInPage: React.FC = () => {
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
                buttonLink='/chat/:id'
                handleSubmit={submit}
            />
        </div>
    );
};

function submit(data: UserData): void {

    const url: string = `http://192.168.1.2:3912/api/login?login=${data.login}&password=${data.password}`;
    const options: RequestInit = {
        method: 'GET',
        mode: 'cors',
    };

    let accessToken: string;

    fetch(url, options)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Network response was not ok.');
        })
        .then(serverResponse => {
            console.log(serverResponse);
            if (serverResponse.status) {
                // form.style.border = '3px solid green';

                accessToken = serverResponse.token;
                console.log('serverResponse.token: ', serverResponse.token);

            } else {
                console.log('serverResponse.message: ', serverResponse.message);
                // form.style.border = '3px solid red';
            }
        })
        .catch(error => console.log(error.message));
}

export default LogInPage;
