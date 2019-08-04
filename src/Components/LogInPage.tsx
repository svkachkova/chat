import React from 'react';
import Form from './Form';

const LogInPage: React.FC = () => {
    return (
        <Form 
            title='Log in'
            text="Don't have an account? "
            linkText='Get started'
            linkHref='/signup'
            buttonText='Login'
            buttonLink='/chat'
        />
    );
};

export default LogInPage;
