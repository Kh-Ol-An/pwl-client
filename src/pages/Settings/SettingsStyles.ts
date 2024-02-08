import { styled, Box, Avatar } from '@mui/material';
import { whiteColor } from '../../styles/variables';

export const Root = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '1em',
    width: '100%',
    height: '100svh',
    padding: '2em',
    color: whiteColor,
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
