import styled from '@emotion/styled';
import { Box, Text } from '~/components';

export const StyledChildrenBox = styled(({ ...otherProps }) => (
  <Box {...otherProps} component="form" />
))`
  height: 50%;
  gap: 20px;
  width: 60%;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
    height: 80%;
  }
`;

export const StyledChildrenTitleBox = styled(({ ...otherProps }) => <Box {...otherProps} />)`
  height: 20%;
  gap: 20px;

  @media (max-width: 768px) {
    height: 30%;
  }
`;

export const StyledTitleText = styled(({ ...otherProps }) => <Text {...otherProps} />)`
  font-size: 2rem;
  font-weight: 600;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

export const StyledSubTitleText = styled(({ ...otherProps }) => <Text {...otherProps} />)`
  font-size: 1.1rem;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;
