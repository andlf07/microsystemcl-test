import styled from '@emotion/styled';
import { Box } from '~/components';

export const StyledLoginLogoSideBox = styled(({ ...otherProps }) => <Box {...otherProps} />)`
  width: 50%;
  height: 500px;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const StyledLoginFormSideBox = styled(({ ...otherProps }) => <Box {...otherProps} />)`
  width: 50%;
  height: 100%;
  justify-content: center;
  align-items: center;
  @media (max-width: 768px) {
    width: 80%;
  }
`;

export const StyledLoginFormBox = styled(({ ...otherProps }) => <Box {...otherProps} />)`
  width: 70%;
  height: 90%;
  border: 2px solid #d3d3d3;
  align-items: center;
  justify-content: space-around;
  padding: 30px;
  border-radius: 15px;
  @media (max-width: 768px) {
    gap: 20px;
    height: 80%;
  }
`;

export const StyledLoginInputBox = styled(({ ...otherProps }) => (
  <Box {...otherProps} component="form" />
))`
  width: 70%;
  gap: 10px;
  @media (max-width: 768px) {
    width: 90%;
  }
`;
