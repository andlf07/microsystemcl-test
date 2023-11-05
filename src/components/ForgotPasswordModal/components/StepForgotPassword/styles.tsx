import styled from '@emotion/styled';
import { Box } from '~/components';

export const StyledChildrenBox = styled(({ ...otherProps }) => (
  <Box {...otherProps} component="form" />
))`
  height: 50%;
  gap: 20px;
  width: 60%;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
    height: 40%;
  }
`;

export const StyledChildrenTitleBox = styled(({ ...otherProps }) => <Box {...otherProps} />)`
  height: 20%;
  gap: 20px;

  @media (max-width: 768px) {
    height: 30%;
  }
`;
