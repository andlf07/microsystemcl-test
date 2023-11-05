import { Typography, TypographyProps } from '@mui/material';
import React from 'react';

interface Props extends TypographyProps {}

const Text: React.FC<Props> = ({ children, ...props }) => {
  return <Typography {...props}>{children}</Typography>;
};

export default Text;
