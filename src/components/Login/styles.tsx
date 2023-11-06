import styled from '@emotion/styled';
import { Box, Text } from '~/components';

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
    width: 100%;
  }
`;

export const StyledLoginFormBox = styled(({ ...otherProps }) => <Box {...otherProps} />)`
  width: 100%;
  height: 90%;
  border: 2px solid #d3d3d3;
  align-items: center;
  justify-content: space-around;
  padding: 30px;
  border-radius: 15px;
  @media (max-width: 768px) {
    gap: 20px;
    height: 90vh;
    padding: 0px;
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

export const StyledLoginImageBox = styled(({ ...otherProps }) => <Box {...otherProps} />)`
  width: 150px;
  height: 150px;
`;

export const StyledLoginBox = styled(({ ...otherProps }) => <Box {...otherProps} />)`
  flex-direction: row;
  height: 100%;
  justify-content: center;
  align-items: center;
  margin-top: 20px;

  @media (max-width: 768px) {
    margin-top: 10px;
  }
`;

export const StyledLoginTitle = styled(({ ...otherProps }) => <Text {...otherProps} />)`
  font-size: 2.125rem;
  font-weight: 400;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

export const StyledAccountText = styled(({ ...otherProps }) => <Text {...otherProps} />)`
  font-size: 1rem;
  font-weight: 400;
  text-align: center;
  color: #555273;
  text-decoration: underline;
  &:hover {
    cursor: pointer;
  }

  @media (max-width: 768px) {
    font-size: 0.75rem;
  }
`;
