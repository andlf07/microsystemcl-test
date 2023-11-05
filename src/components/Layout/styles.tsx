import styled from '@emotion/styled';
import { Stack } from '@mui/material';

export const StyledLayoutMainContainer = styled(({ ...otherProps }) => (
  <Stack {...otherProps} component="main" />
))`
  width: 100%;
  height: 95vh;
`;
