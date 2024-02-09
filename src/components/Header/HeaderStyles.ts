import { styled, CardHeader, Box } from '@mui/material';
import { highZIndex1, secondaryColor, smLightShadow } from '../../styles/variables';

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
