import { styled, Box, Avatar } from '@mui/material';
import { whiteColor, secondaryColor, smLightShadow } from '../../styles/variables';

export const Root = styled(Box)({
    position: 'absolute' as 'absolute',
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

export const AvatarBox = styled(Box)({
//    position: 'relative',
});

export const FileInput = styled('input')({
    display: 'none',
});

export const AvatarImg = styled(Avatar)({
    cursor: 'pointer',
});
