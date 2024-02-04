import { styled, List } from '@mui/material';
import { secondaryLightColor } from '../../styles/variables';

export const Root = styled(List)({
    display: 'flex',
    flexDirection: 'column',
    width: '30%',
    height: '100svh',
    padding: '2em',
    borderRight: `1px solid ${secondaryLightColor}`,
});
