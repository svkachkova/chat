import React from 'react';
import { Link } from 'react-router-dom';
import Form, { UserData } from '../components/Form';

type Props = {
    userData: UserData;
    handleChange: (data: UserData) => void;
    handleSubmit: () => void;
}

function SignUp(props: Props) {
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
                userData={props.userData}
                onUserChange={props.handleChange}
                handleSubmit={() => props.handleSubmit()}
            />
        </div>
    );
};

export default SignUp;
