import React from 'react';
import { FormInputController } from '~/components';
import { StepForgotPassword } from '..';
import { Control } from 'react-hook-form';

interface Props {
  control: Control<any, any>;
  onSubmit: any;
}

const StepEmail: React.FC<Props> = ({ control, onSubmit }) => {
  return (
    <StepForgotPassword
      title="¿Olvidaste tu contraseña?"
      subTitle="No te preocupes, te enviaremos un correo con las instrucciones"
      onSubmit={onSubmit}
    >
      <FormInputController
        options={{ required: true }}
        control={control}
        name="email"
        label="Email"
        type="text"
      />
    </StepForgotPassword>
  );
};

export default StepEmail;
