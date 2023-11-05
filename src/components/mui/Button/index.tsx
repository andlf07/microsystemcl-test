import { ButtonProps, Button as MuiButton } from '@mui/material';
import React from 'react';

interface Props extends ButtonProps {}

const Button: React.FC<Props> = ({ children, ...props }) => {
  return (
    <MuiButton
      sx={{
        backgroundColor: '#555273',
        color: '#fff',
        borderRadius: '8px',
        height: '45px',
        fontSize: '1rem',
        gap: '10px',
        '&:hover': {
          backgroundColor: '#5d5a75',
        },
      }}
      {...props}
    >
      {children}
    </MuiButton>
  );
};

export default Button;
