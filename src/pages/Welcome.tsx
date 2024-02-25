import React, { FC } from 'react';
import Button from '../components/Button';

const Welcome: FC = () => {
    return (
        <div className="page welcome-page">
            <h1 className="title">Welcome</h1>
            <Button to="/auth">Auth</Button>
        </div>
    );
};

export default Welcome;
