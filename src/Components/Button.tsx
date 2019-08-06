import React from 'react';
import { Link } from 'react-router-dom';

interface Props {
    value: string;
    link?: string;
    onClick?: (e: React.MouseEvent) => void; 
}

function Button(props: Props) {
    if (props.link) {
        return (
            <Link to={props.link}>
                <button onClick={props.onClick}>
                    {props.value}
                </button>
            </Link>
        );
    }
    return (
        <button onClick={props.onClick}>
            {props.value}
        </button>
    );
};

export default Button;
