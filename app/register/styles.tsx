import styled from '@emotion/styled';
import { Box } from '~/components';

export const StyledBox = styled(({ ...otherProps }) => <Box {...otherProps} />)`
  height: 100%;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    height: auto;
  }
`;
