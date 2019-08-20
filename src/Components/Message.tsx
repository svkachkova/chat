import React from 'react';

interface Props {
    sender: string;
    message: string;
    datetime: string;
}

const Message = (props: Props) => {
    return (
        <>
            <div>{props.sender}</div>
            <div>{props.message}</div>
            <div>{props.datetime}</div>
        </>
    );
};

export default Message;
