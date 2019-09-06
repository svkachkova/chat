import React from 'react';
import Message from '../components/Message';
import Button from '../components/Button';

type Message = {
    sender: string;
    receiver: string;
    message: string;
    datetime: string;
}

type Props = {
    token: string;
    userLogin: string;
    contactUserLogin: string;
}

type State = {
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
        this.getHistory();
    }

    handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            message: event.target.value
        });
    }

    getHistory() {
        const { token, contactUserLogin } = this.props;

        const url: string = `http://192.168.1.6:3912/api/getHistory?peer=${contactUserLogin}&token=${token}`;
    
        const callback = (response: any) => {
            this.setState({
                messages: response.messages
            });
        }
    
        submit(url, callback);
    }

    sendMessage(event: React.MouseEvent) {
        event.preventDefault();

        const { token, contactUserLogin } = this.props;
        const { message } = this.state;

        const url: string = `http://192.168.1.6:3912/api/sendMessage?to=${contactUserLogin}&token=${token}&message=${message}`;

        const callback = (response: any) => {
            this.setState({
                message: ''
            });
        }

        sendMessage(this.state.message);
        submit(url, callback);

        this.getHistory();
    }

    render() {
        const { message, messages } = this.state;
        const { userLogin } =  this.props;

        const listMessages: JSX.Element[] = messages.map((message: Message, index: number) => {
            const className: string = userLogin === message.sender ? 
                'message currentUser' : 'message';

            return (
                <li key={index} className={className}>
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
                <div className='header'>
                    <Button 
                        value='Contacts' 
                        link='/contacts'
                    />
                    <p className='headerUser'>
                        {this.props.userLogin}
                    </p>
                </div>
                <ul className='messages-list'>{listMessages}</ul>
                <form className='form'>
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

function submit(url: string, callback: (response: any) => void) {
    
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
                callback(serverResponse);
            } else {
                console.log(serverResponse.message);
            }
        })
        .catch(error => console.log(error.message));
}

function sendMessage(message: string) {
    console.log('message: ', message);
}

export default Chat;
