import { styled, Box, Typography } from '@mui/material';
import { accentColor, primaryColor, secondaryColor, whiteColor } from '../../styles/variables';

export const Root = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '1em',
    width: '100%',
    height: '100svh',
    padding: '2em',
    backgroundImage: `url(${require("../../assets/images/invisible-gift.png")}), radial-gradient(circle, ${accentColor} 0%, ${secondaryColor} 30%)`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'bottom right',
});

export const Title = styled(Typography)({
    textAlign: 'center',
    fontSize: '8em',
    fontWeight: 700,
    color: primaryColor,
});

export const SubTitle = styled(Typography)({
    textAlign: 'center',
    fontSize: '4em',
    fontWeight: 700,
    color: whiteColor,
});

export const Text = styled(Typography)({
    textAlign: 'center',
    fontSize: '2.4em',
    fontWeight: 700,
    color: primaryColor,
});

export const SubText = styled(Typography)({
    textAlign: 'center',
    fontSize: '1.4em',
    fontWeight: 700,
    color: primaryColor,
});
