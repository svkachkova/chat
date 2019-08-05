import React from 'react';
import Button from '../Button';

const PromoPage: React.FC = () => {
    return (
        <div>
            <h1>Webchat</h1>
            <Button 
                text="Get Started"
                link='/signup'
            />
        </div>
    );
};

export default PromoPage;
