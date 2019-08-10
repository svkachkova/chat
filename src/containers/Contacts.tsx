import React from 'react';
import Button from '../components/Button'
import UserCard from '../components/UserCard';

interface User {
    login: string;
}

interface Props {
    users: User[];
}

const Contacts = (props: Props) => {
    const users: User[] = props.users;

    const listUsers = users.map((user: User, index: number) => {
        return (
            <li key={index}>
                <UserCard
                    login={user.login}
                    link={`/${user.login}`}
                 />
            </li>
        );
    });

    return (
        <div>
            <div className='flex-row'>
                <p>userName</p>
                <Button
                    value='add'
                    link='/add'
                 />
            </div>
            <ul>{listUsers}</ul>
        </div>
    );
};

export default Contacts;
