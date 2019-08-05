import React from 'react';
import { Link } from 'react-router-dom';

interface Props {
    text: string;
    link: string;
}

function Button(props: Props) {
    return (
        <Link to={props.link}>
            <button>
                {props.text}
            </button>
        </Link>
    );
};

export default Button;
