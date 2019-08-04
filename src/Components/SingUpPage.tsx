import React from 'react';
import Form from './Form';

const SingUpPage: React.FC = () => {
    return (
        <Form 
            title='Get started'
            text='Already have an account? '
            linkHref='/loggin'
            linkText='Login'
            buttonText='Join'
            buttonLink='/chat'
        />
    );
};

export default SingUpPage;
