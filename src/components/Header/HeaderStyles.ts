import { styled, CardHeader, Box } from '@mui/material';
import { highZIndex1, secondaryColor, smLightShadow, whiteColor } from '../../styles/variables';

export const HeaderBox = styled(CardHeader)({
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

export const ModalBox = styled(Box)({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '1em',
    width: '30em',
    padding: '2em',
    color: whiteColor,
    backgroundColor: secondaryColor,
    boxShadow: smLightShadow,
});
