import React from 'react';

type Props = {
    sender: string;
    message: string;
    datetime: string;
}

const Message = (props: Props) => {
    return (
        <>
            <span className='avatar'/>
            <div className='message-content'>
                <div className='username'>{props.sender}</div>
                <div className='text'>{props.message}</div>
                <div className='date'>{props.datetime.match(/\d\d:\d\d/)}</div>
            </div>
        </>
    );
};

export default Message;
