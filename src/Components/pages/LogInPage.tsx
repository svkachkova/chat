import React from 'react';
import { Link } from 'react-router-dom';
import Form from '../Form';

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
            />
        </div>
    );
};

export default LogInPage;
