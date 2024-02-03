import { Box, styled } from '@mui/material';
import { actionColor, whiteColor } from '../../styles/variables';

export const Root = styled(Box)({
    position: 'fixed',
    top: 0,
    right: 0,
    left: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    padding: '0.5em 2em',
    backgroundColor: actionColor,
    color: whiteColor,
    fontSize: '1.6em',
});
