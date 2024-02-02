import { styled, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { primaryColor, whiteColor } from '../../styles/variables';

const styles = {
    margin: 0,
    padding: '0.4em 1.6em',
    width: 'auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.8em',
    border: 'none',
    borderRadius: 6,
    backgroundColor: primaryColor,
    color: whiteColor,
    fontSize: '1.8em',
    fontWeight: 700,
    lineHeight: 1.5,
    textDecoration: 'none',
    cursor: 'pointer',
    transition: 'all 300ms ease-in-out',
    outline: 'none',

    '&:focus': {
        outline: 'none',
    },

    '&:hover': {
        backgroundColor: primaryColor,
    },

    '&:active': {
        backgroundColor: primaryColor,
    },
};

export const TagLink = styled(Link)(styles);

export const TagButton = styled(Button)({ ...styles, textTransform: 'none' });