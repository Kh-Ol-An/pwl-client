import { styled, Box } from '@mui/material';

export const Root = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    width: 300,
    padding: 20,
    borderRadius: 6,
    backgroundColor: '#fff',
    boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.5)',
});