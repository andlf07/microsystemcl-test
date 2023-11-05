import { MuiOtpInput } from 'mui-one-time-password-input';
import React from 'react';
import { StepForgotPassword } from '..';
import { Control, Controller } from 'react-hook-form';
import { Stack } from '@mui/material';

interface Props {
  control: Control<any, any>;
  onSubmit: any;
  email: string;
}

const StepOtpCode: React.FC<Props> = ({ control, onSubmit, email }) => {
  return (
    <StepForgotPassword
      title="Restablecer contraseña"
      subTitle={`Te hemos enviado un código a ${email}`}
      onSubmit={onSubmit}
    >
      <Stack width="70%" alignSelf="center">
        <Controller
          name="otpCode"
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <MuiOtpInput length={5} sx={{ gap: '5px' }} onChange={onChange} value={value} />
          )}
        />
      </Stack>
    </StepForgotPassword>
  );
};

export default StepOtpCode;
