import React from 'react';
import { Link } from 'react-router-dom';
import Form from '../Form';

interface Props {
    handleSubmit: () => void;
}

function SignUpPage(props: Props) {
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
                buttonValue='Join'
                handleSubmit={() => props.handleSubmit()}
            />
        </div>
    );
};

export default SignUpPage;
