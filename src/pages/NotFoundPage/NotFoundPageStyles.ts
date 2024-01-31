import { styled, Box, Typography } from '@mui/material';
import { primaryColor, whiteColor } from '../../styles/variables';

export const Root = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    width: '100%',
    height: '100svh',
    padding: 20,
    backgroundColor: primaryColor,
});

export const Title = styled(Typography)({
    textAlign: 'center',
    fontSize: '14em',
    fontWeight: 700,
    color: whiteColor,
});