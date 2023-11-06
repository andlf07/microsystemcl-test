import React, { ReactNode } from 'react';
import { Button } from '~/components';
import {
  StyledChildrenBox,
  StyledChildrenTitleBox,
  StyledSubTitleText,
  StyledTitleText,
} from './styles';

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
        <StyledTitleText>{title}</StyledTitleText>
        <StyledSubTitleText>{subTitle}</StyledSubTitleText>
      </StyledChildrenTitleBox>
      <StyledChildrenBox onSubmit={onSubmit}>
        {children}
        <Button type="submit">
          <StyledSubTitleText>Restablecer contraseña</StyledSubTitleText>
        </Button>
      </StyledChildrenBox>
    </>
  );
};

export default StepForgotPassword;
