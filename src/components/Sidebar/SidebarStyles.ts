import { styled, List } from '@mui/material';
import { smLightShadow } from '../../styles/variables';

export const Root = styled(List)({
    display: 'flex',
    flexDirection: 'column',
    width: '30%',
    height: '100svh',
    padding: '9.2em 0 3em',
    boxShadow: smLightShadow,
});
