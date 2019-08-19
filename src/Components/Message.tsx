import React from 'react';

interface Props {
    sender: string;
    message: string;
    datetime: string;
}

const Message = (props: Props) => {
    return (
        <div>
            <p>{props.sender}</p>
            <p>{props.message}</p>
            <span>{props.datetime}</span>
        </div>
    );
};

export default Message;
