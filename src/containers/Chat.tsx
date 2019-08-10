import React from 'react';
import Message from '../components/Message';
import Button from '../components/Button';

interface Props {}

const Chat = (props: Props) => {
    return(
        <div>
            <div className='flex-row'>
                <Button 
                    value='Contacts' 
                    link='/contacts'
                />
                <p>{user.login}</p>
            </div>
            <div>listMessages</div>
            <form className='flex-row'>
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
            </form>
        </div>
    );
};

export default Chat;
