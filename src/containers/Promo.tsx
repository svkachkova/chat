import React from 'react';
import Button from '../components/Button';

const Promo: React.FC = () => {
    return (
        <div>
            <h1>Webchat</h1>
            <Button 
                value='Get Started'
                link='/signup'
            />
        </div>
    );
};

export default Promo;
