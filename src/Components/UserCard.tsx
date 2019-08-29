import React from 'react';
import { Link } from 'react-router-dom';

type Props = {
    login: string;
    link: string;
}

const UserCard = (props: Props) => {
    return (
        <Link to={props.link}>
            <div>{props.login}</div>
        </Link>
    );
};

export default UserCard;
