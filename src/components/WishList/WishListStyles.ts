import { styled, Box } from '@mui/material';
import { secondaryColor, smLightShadow, whiteColor } from '../../styles/variables';

export const WishListS = styled('ul')({
    marginBottom: '2em',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '1em',
});

export const WishItem = styled('li')({
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

export const ImgList = styled('ul')({
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '1em',
});

export const ImgItem = styled('li')({
    width: '8em',
    height: '8em',
});

export const Image = styled('img')({
    width: '100%',
    height: '100%',
    objectFit: 'cover',
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
