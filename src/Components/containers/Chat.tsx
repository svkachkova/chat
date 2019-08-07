import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

type TParams = { id: string };

const Chat = ({ match }: RouteComponentProps<TParams>) => {
    return(
        <div>
            <h1>Hello chat!</h1>
            <p>This is a page for user with ID: {match.params.id}</p> 
        </div>
    );
};

export default Chat;
