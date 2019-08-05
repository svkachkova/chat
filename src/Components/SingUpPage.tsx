import React from 'react';
import { Link } from 'react-router-dom';
import Form from './Form';

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
                buttonLink='/chat'
            />
        </div>
    );
};

export default SingUpPage;
