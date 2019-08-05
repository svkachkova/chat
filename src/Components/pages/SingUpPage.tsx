import React from 'react';
import { Link } from 'react-router-dom';
import Form, { State as UserData } from '../Form';

const SingUpPage: React.FC = () => {
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
                buttonLink='/chat/:id'
                handleSubmit={submit}
            />
        </div>
    );
};

function submit(data: UserData): void {
    // const formData: User = getFormData(form);

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
            console.log(serverResponse);
            if (serverResponse.status) {
                // form.style.border = '3px solid green';
            } else {
                console.log(serverResponse.message);
                // form.style.border = '3px solid red';
            }
        })
        .catch(error => console.log(error.message));
}

export default SingUpPage;
