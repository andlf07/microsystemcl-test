import React from 'react';
import { Control } from 'react-hook-form';
import { Box, FormInputController, Text } from '~/components';

interface Props {
  control: Control<any, any>;
  errors: any;
  getValues: any;
}

const AccountForm: React.FC<Props> = ({ control, errors, getValues }) => {
  return (
    <>
      <Box width="100%">
        <Text fontSize="1rem" fontWeight="500">
          Email:
        </Text>
        <FormInputController
          options={{
            required: {
              value: true,
              message: 'Email es requerido.',
            },
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: 'Email tiene que ser un email valido.',
            },
          }}
          control={control}
          name="email"
          label="Email"
          type="text"
        />
        {errors.email && (
          <Text fontSize="0.75rem" fontWeight="500" sx={{ color: 'red' }}>
            {errors.email.message}
          </Text>
        )}
      </Box>
      <Box width="100%" direction="row" gap="10px">
        <Box width="50%">
          <Text fontSize="1rem" fontWeight="500">
            Primer nombre:
          </Text>
          <FormInputController
            options={{
              required: {
                value: true,
                message: 'Primer nombre es requerido.',
              },
              pattern: {
                value: /^[a-zA-Z]+$/,
                message: 'Primer nombre tiene que ser valido.',
              },
            }}
            control={control}
            name="first_name"
            label="Primer nombre"
            type="text"
          />
          {errors.first_name && (
            <Text fontSize="0.75rem" fontWeight="500" sx={{ color: 'red' }}>
              {errors.first_name.message}
            </Text>
          )}
        </Box>
        <Box width="50%">
          <Text fontSize="1rem" fontWeight="500">
            Apellido:
          </Text>
          <FormInputController
            options={{
              required: {
                value: true,
                message: 'Apellido es requerido.',
              },
              pattern: {
                value: /^[a-zA-Z]+$/,
                message: 'Apellido tiene que ser valido.',
              },
            }}
            control={control}
            name="last_name"
            label="Apellido"
            type="text"
          />
          {errors.last_name && (
            <Text fontSize="0.75rem" fontWeight="500" sx={{ color: 'red' }}>
              {errors.last_name.message}
            </Text>
          )}
        </Box>
      </Box>
      <Box width="100%">
        <Text fontSize="1rem" fontWeight="500">
          Contraseña:
        </Text>
        <FormInputController
          options={{
            required: {
              value: true,
              message: 'Password es requerido',
            },
            minLength: { value: 8, message: 'Password tiene que ser de al menos 8 caracteres' },
          }}
          control={control}
          name="password"
          label="Password"
          type="password"
        />
        {errors.password && (
          <Text fontSize="0.75rem" fontWeight="500" sx={{ color: 'red' }}>
            {errors.password.message}
          </Text>
        )}
      </Box>

      <Box width="100%">
        <Text fontSize="1rem" fontWeight="500">
          Confirmar contraseña:
        </Text>
        <FormInputController
          options={{
            required: {
              value: true,
              message: 'Confirmar password es requerido.',
            },
            minLength: { value: 8, message: 'Password tiene que ser de al menos 8 caracteres' },
            validate: value => {
              const { password } = getValues();
              return password === value || 'Passwords should match!';
            },
          }}
          control={control}
          name="confirmPassword"
          label="Confirmar password"
          type="password"
        />
        {errors.confirmPassword && (
          <Text fontSize="0.75rem" fontWeight="500" sx={{ color: 'red' }}>
            {errors.confirmPassword.message}
          </Text>
        )}
      </Box>
    </>
  );
};

export default AccountForm;
