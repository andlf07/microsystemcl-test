import React, { ReactNode } from 'react';
import { Button, Text } from '~/components';
import { StyledChildrenBox, StyledChildrenTitleBox } from './styles';

interface Props {
  children: ReactNode;
  title: string;
  subTitle: string;
  onSubmit: any;
}

const StepForgotPassword: React.FC<Props> = ({ children, title, subTitle, onSubmit }) => {
  return (
    <>
      <StyledChildrenTitleBox>
        <Text fontSize="2rem" fontWeight="600" textAlign="center">
          {title}
        </Text>
        <Text fontSize="1.1rem" textAlign="center">
          {subTitle}
        </Text>
      </StyledChildrenTitleBox>
      <StyledChildrenBox onSubmit={onSubmit}>
        {children}
        <Button type="submit">Restablecer contraseña</Button>
      </StyledChildrenBox>
    </>
  );
};

export default StepForgotPassword;
