import React from 'react';
import { Link } from 'react-router-dom';
import Form from '../Form';

interface Props {
    handleSubmit: () => void;
}

function LogInPage(props: Props) {
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
                buttonValue='Login'
                handleSubmit={() => props.handleSubmit()}
            />
        </div>
    );
};

export default LogInPage;
