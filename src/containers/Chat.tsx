import React from 'react';
import Message from '../components/Message';
import Button from '../components/Button';

interface History {
    sender: string;
    receiver: string;
    message: string;
    datetime: string;
}

interface Props {
    token: string;
    userLogin: string;
    contactUserLogin: string;
}

interface State {
    history: History[];
}

class Chat extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            history: []
        };
    }
    componentDidMount() {
        const { token, contactUserLogin } = this.props;

        const url: string = `http://192.168.1.6:3912/api/getHistory?peer=${contactUserLogin}&token=${token}`;
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
                        history: serverResponse.history
                    });
                } else {
                    console.log(serverResponse.message);
                }
            })
            .catch(error => console.log(error.message));
    }

    render() {
        const { history } = this.state;

        const listMessages: JSX.Element[] = history.map((message: History, index: number) => {
            return (
                <li key={index} className='float-left'>
                    <Message 
                        sender={message.sender}
                        message={message.message}
                        datetime={message.datetime}
                    />
                </li>
            );
        });
        
        return(
            <div>
                <div className='flex-row'>
                    <Button 
                        value='Contacts' 
                        link='/contacts'
                    />
                    <p>{this.props.userLogin}</p>
                </div>
                <ul>{listMessages}</ul>
                {/* <form className='flex-row'>
                    <input
                        type='text'
                        name='message'
                        value={message}
                        placeholder='Write a message...'
                        onChange={handleChange}
                    />
                    <Button 
                        value='Send' 
                        onClick={sendMessage}
                    />
                </form> */}
            </div>
        );
    }
};

export default Chat;
