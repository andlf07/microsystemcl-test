'use client';
import React, { HTMLInputTypeAttribute } from 'react';
import { Control, Controller, RegisterOptions } from 'react-hook-form';
import { Input } from '..';
import { TextFieldProps } from '@mui/material';

interface Props {
  name: string;
  control: Control<any, any>;
  label: string;
  type: HTMLInputTypeAttribute;
  options?: RegisterOptions;
  inputProps?: TextFieldProps;
  defaultValue?: any;
}

const FormInputController: React.FC<Props> = ({
  name,
  control,
  label,
  type,
  options,
  inputProps,
  defaultValue,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      rules={options}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <Input
          placeholder={label}
          value={value}
          onChange={onChange}
          type={type}
          error={!!error}
          {...inputProps}
        />
      )}
    />
  );
};

export default FormInputController;
