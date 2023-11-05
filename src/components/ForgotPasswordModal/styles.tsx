import styled from '@emotion/styled';
import Box from '../mui/Box';

export const StyledModalContainer = styled(({ ...otherProps }) => <Box {...otherProps} />)`
  position: absolute;
  flex-direction: column;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50%;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 24;
  padding: 20px;
  height: 60%;
  gap: 40px;

  @media (max-width: 768px) {
    width: 80%;
  }
`;
