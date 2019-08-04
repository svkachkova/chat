import React from 'react';
import { Link } from 'react-router-dom';

interface Props {
    text: string;
    link: string;
}

function Button(props: Props) {
    return (
        // <button>
            <Link to={props.link}>
                {props.text}
            </Link>
        // </button>
    );
};

export default Button;
