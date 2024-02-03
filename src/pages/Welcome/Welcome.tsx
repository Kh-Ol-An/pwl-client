import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { Root } from './WelcomeStyles';

const Welcome: FC = () => {
    return (
        <Root>
            Welcome
            <Link to="/auth">Auth</Link>
        </Root>
    );
};

export default Welcome;
