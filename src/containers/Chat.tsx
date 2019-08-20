import React from 'react';
import Message from '../components/Message';
import Button from '../components/Button';

interface Message {
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
    message: string;
    messages: Message[];
}

class Chat extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            message: '',
            messages: []
        };

        this.handleChange = this.handleChange.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
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
                        messages: serverResponse.messages
                    });
                } else {
                    console.log(serverResponse.message);
                }
            })
            .catch(error => console.log(error.message));
    }

    handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            message: event.target.value
        });
    }

    sendMessage(event: React.MouseEvent) {
        event.preventDefault();
        sendMessage(this.state.message);

        this.setState({
            message: ''
        });
    }

    render() {
        const { message, messages } = this.state;

        const listMessages: JSX.Element[] = messages.map((message: Message, index: number) => {
            return (
                <li key={index} className='message'>
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
                <ul className='message-list'>{listMessages}</ul>
                <form>
                    <input
                        type='text'
                        name='message'
                        value={message}
                        placeholder='Write a message...'
                        onChange={this.handleChange}
                    />
                    <Button 
                        value='Send' 
                        onClick={this.sendMessage}
                    />
                </form>
            </div>
        );
    }
};

function sendMessage(message: string) {
    console.log('message: ', message);
}

export default Chat;
