import { styled, Box } from '@mui/material';
import { secondaryColor, secondaryLightColor, lightShadow } from '../../styles/variables';

export const Root = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100svh',
    padding: '2em',
    backgroundColor: secondaryColor,
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
    backgroundColor: secondaryLightColor,
    boxShadow: lightShadow,
});