'use client';
import React from 'react';
import { StyledLayoutMainContainer } from './styles';

interface Props {
  children?: React.JSX.Element | React.JSX.Element[];
}

const Layout: React.FC<Props> = ({ children }) => {
  return <StyledLayoutMainContainer>{children}</StyledLayoutMainContainer>;
};

export default Layout;
