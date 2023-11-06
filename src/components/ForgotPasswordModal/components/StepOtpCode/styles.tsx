import styled from '@emotion/styled';
import { Box } from '~/components';

export const StyledOtpBox = styled(({ ...otherProps }) => <Box {...otherProps} />)`
  width: 70%;
  align-self: center;

  @media (max-width: 768px) {
    width: 100%;
  }
`;
