import React from 'react';
import { Stack, StackProps } from '@mui/material';

interface Props extends StackProps {}

const Box: React.FC<Props> = ({ children, ...props }) => {
  return <Stack {...props}>{children}</Stack>;
};

export default Box;
