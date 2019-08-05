import React from 'react';
import Button from './Button';

interface Props {
    buttonText: string;
    buttonLink: string;
}

function Form(props: Props) {
    return (
        <form>
            <label>
                Login: 
                <input 
                    type="text" 
                    name="login"
                    placeholder="Login" 
                />
            </label>
            <label>
                Password: 
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                />
            </label>
            <Button 
                text={props.buttonText} 
                link={props.buttonLink} 
            />
        </form>
    );
};

export default Form;
