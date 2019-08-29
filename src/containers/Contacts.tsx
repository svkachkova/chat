import React from 'react';
import Button from '../components/Button'
import UserCard from '../components/UserCard';

type User = {
    login: string;
}

type Props = {
    token: string;
}

type State = {
    contacts: User[];
}

class Contacts extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            contacts: []
        };
    }

    componentDidMount() {
        const { token } = this.props;

        const url: string = `http://192.168.1.6:3912/api/getContacts?token=${token}`;
        const options: RequestInit = {
            method: 'GET',
            mode: 'cors',
        };

        fetch(url, options)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Network response was not ok.');
            })
            .then(serverResponse => {
                if (serverResponse.status) {
                    this.setState({
                        contacts: serverResponse.contacts
                    });
                } else {
                    console.log(serverResponse.message);
                }
            })
            .catch(error => console.log(error.message));
    }

    render() {
        const { contacts } = this.state;

        const listUsers: JSX.Element[] = contacts.map((user: User, index: number) => {
            return (
                <li key={index}>
                    <UserCard
                        login={user.login}
                        link={`/chat/${user.login}`}
                    />
                </li>
            );
        });

        return (
            <div>
                <div>
                    <p>userName</p>
                    <Button
                        value='add'
                        link='/add'
                     />
                </div>
                <ul>{listUsers}</ul>
            </div>
        );
    }
};

export default Contacts;
