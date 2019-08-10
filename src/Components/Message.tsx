import React from 'react';

interface Props {
    message: string;
    date: Date;
}

const Message = (props: Props) => {
    return (
        <div>
            <p>{props.message}</p>
            <span>{props.date.toLocaleTimeString('ru')}</span>
        </div>
    );
};

export default Message;
