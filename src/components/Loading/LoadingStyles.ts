import { styled, Box } from '@mui/material';
import { secondaryColor, whiteColor, mainZIndex } from '../../styles/variables';

export const Root = styled(Box)({
    position: 'fixed',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: mainZIndex,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100svh',
    padding: '2em',
    backgroundColor: secondaryColor,
});

export const Spinner = styled(Box)({
    display: 'inline-block',
    position: 'relative',
    width: '8em',
    height: '8em',

    '& div': {
        position: 'absolute',
        width: '0.6em',
        height: '0.6em',
        backgroundColor: whiteColor,
        borderRadius: '50%',
        animation: 'spinner 1.2s infinite ease-in-out',
    },

    '& div:nth-of-type(1)': {
        animationDelay: '0s',
        top: '3.7em',
        left: '6.6em',
    },

    '& div:nth-of-type(2)': {
        animationDelay: '-0.1s',
        top: '2.2em',
        left: '6.2em',
    },

    '& div:nth-of-type(3)': {
        animationDelay: '-0.2s',
        top: '1.1em',
        left: '5.2em',
    },

    '& div:nth-of-type(4)': {
        animationDelay: '-0.3s',
        top: '0.7em',
        left: '3.7em',
    },

    '& div:nth-of-type(5)': {
        animationDelay: '-0.4s',
        top: '1.1em',
        left: '2.2em',
    },

    '& div:nth-of-type(6)': {
        animationDelay: '-0.5s',
        top: '2.2em',
        left: '1.1em',
    },

    '& div:nth-of-type(7)': {
        animationDelay: '-0.6s',
        top: '3.7em',
        left: '0.7em',
    },

    '& div:nth-of-type(8)': {
        animationDelay: '-0.7s',
        top: '5.2em',
        left: '1.1em',
    },

    '& div:nth-of-type(9)': {
        animationDelay: '-0.8s',
        top: '6.2em',
        left: '2.2em',
    },

    '& div:nth-of-type(10)': {
        animationDelay: '-0.9s',
        top: '6.6em',
        left: '3.7em',
    },

    '& div:nth-of-type(11)': {
        animationDelay: '-1s',
        top: '6.2em',
        left: '5.2em',
    },

    '& div:nth-of-type(12)': {
        animationDelay: '-1.1s',
        top: '5.2em',
        left: '6.2em',
    },

    '@keyframes spinner': {
        '0%, 20%, 80%, 100%': {
            transform: 'scale(1)',
        },
        '50%': {
            transform: 'scale(1.5)',
        },
    },
});
