import { styled, Box, CardHeader } from '@mui/material';
import { Link } from 'react-router-dom';
import { highZIndex1, secondaryColor, smLightShadow } from '../../styles/variables';

export const Root = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100svh',
});

export const Container = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100svh',
    padding: '2em',
});

export const Header = styled(CardHeader)({
    position: 'fixed',
    top: 0,
    right: 0,
    left: 0,
    zIndex: highZIndex1,
    backgroundColor: secondaryColor,
    boxShadow: smLightShadow,

    '& .MuiCardHeader-action': {
        margin: 0,
    }
});

export const HeaderLink = styled(Link)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
});
