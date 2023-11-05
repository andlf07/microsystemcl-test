import React from 'react';
import { StepForgotPassword } from '..';
import { FormInputController } from '~/components';
import { Control } from 'react-hook-form';

interface Props {
  control: Control<any, any>;
  onSubmit: any;
  getValues: any;
}

const StepNewPassword: React.FC<Props> = ({ control, onSubmit, getValues }) => {
  return (
    <StepForgotPassword
      title="Nueva contraseña"
      subTitle="Ingresa tu nueva contraseña"
      onSubmit={onSubmit}
    >
      <FormInputController
        options={{
          required: true,
          minLength: { value: 8, message: 'Password must have at least 8 characters' },
        }}
        control={control}
        name="newPassword"
        label="Password"
        type="password"
      />
      <FormInputController
        options={{
          required: true,
          minLength: { value: 8, message: 'Password must have at least 8 characters' },

          validate: value => {
            const { newPassword } = getValues();
            return newPassword === value || 'Passwords should match!';
          },
        }}
        control={control}
        name="confirmPassword"
        label="Confirm password"
        type="password"
      />
    </StepForgotPassword>
  );
};

export default StepNewPassword;
