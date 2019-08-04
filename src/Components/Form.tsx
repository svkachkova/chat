import React from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';

interface Props {
    title: string;
    text: string;
    linkHref: string;
    linkText: string;
    buttonText: string;
    buttonLink: string;
}

function Form(props: Props) {
    return (
        <form>
            <h1>{props.title}</h1>
            <p>
                {props.text}
                <Link to={props.linkHref}>
                {props.linkText}
            </Link>
            </p>
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
