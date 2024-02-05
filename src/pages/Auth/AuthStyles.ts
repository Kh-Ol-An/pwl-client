import { styled, Box, Typography } from '@mui/material';
import { secondaryColor, secondaryLightColor, lightShadow, primaryColor } from '../../styles/variables';

export const Root = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100svh',
    padding: '2em',
});

export const Wrap = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '1em',
    width: '30em',
    padding: '1.6em 2em',
    borderRadius: 6,
    backgroundColor: secondaryColor,
    boxShadow: lightShadow,
});

export const Title = styled(Typography)({
    fontSize: '1.8em',
    color: secondaryColor,
    textAlign: 'center',
});

export const ToggleRegistration = styled('button')({
    margin: 0,
    padding: 0,
    display: 'inline',
    backgroundColor: 'transparent',
    border: 'none',
    color: primaryColor,
    fontSize: '1.6em',
    textAlign: 'center',
    outline: 'none',
    cursor: 'pointer',

    '&:focus': {
        outline: 'none',
    },
});