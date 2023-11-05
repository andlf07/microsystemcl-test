import styled from '@emotion/styled';
import { Button } from '..';
import Box from '../mui/Box';

export const StyledBox = styled(({ ...otherProps }) => <Box {...otherProps} component="form" />)`
  width: 40%;
  height: 100%;
  border: 2px solid #d3d3d3;
  align-items: center;
  padding: 15px 30px;
  border-radius: 15px;
  justify-content: space-between;
  margin: 20px 0px;

  @media (max-width: 768px) {
    width: 85%;
    gap: 10px;
    padding: 15px;
  }
`;

export const StyledCreateAccountButton = styled(({ ...otherProps }) => <Button {...otherProps} />)`
  background-color: #fff;
  color: #555273;
  font-size: 1rem;
  font-weight: 500;
  border: 2px solid #555273;
  align-self: center;
  width: 50%;
  &:hover {
    background-color: #555273;
    color: #fff;
  }

  @media (max-width: 768px) {
    width: 70%;
  }
`;
