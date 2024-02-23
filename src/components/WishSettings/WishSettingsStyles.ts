import { styled, Box } from '@mui/material';

export const DnD = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    gap: '1em',
});

export const DnDArea = styled(Box)({
    padding: '5em',
    cursor: 'pointer',
    border: '2px dashed #fff',
});

export const DnDList = styled('ul')({
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: '0.6em',
});

export const DnDItem = styled('li')({
    position: 'relative',
    width: '6em',
    height: '6em',
});

export const Image = styled('img')({
    width: '100%',
    height: '100%',
    objectFit: 'cover',
});
