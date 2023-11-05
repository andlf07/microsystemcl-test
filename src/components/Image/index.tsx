'use client';
import React from 'react';
import NextImage, { ImageProps } from 'next/image';
import { Box } from '../mui';

interface Props extends ImageProps {}

const Image: React.FC<Props> = ({ ...props }) => {
  return (
    <Box position="relative" sx={{ width: '100%', height: '100%' }}>
      <NextImage {...props} fill />
    </Box>
  );
};

export default Image;
