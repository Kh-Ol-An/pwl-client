import { styled, Box } from '@mui/material';
import { secondaryColor, smLightShadow, whiteColor } from '../../styles/variables';

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
