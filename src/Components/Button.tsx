import React from 'react';
import { Link } from 'react-router-dom';

type Props = {
    value: string;
    link?: string;
    onClick?: (e: React.MouseEvent) => void; 
}

function Button(props: Props) {
    const button = (
        <button onClick={props.onClick}>
            {props.value}
        </button>
    );

    if (props.link) {
        return (
            <Link to={props.link}>
                {button}
            </Link>
        );
    }
    return button;
};

export default Button;
