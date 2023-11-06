'use client';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import GoogleIcon from '@mui/icons-material/Google';
import Link from 'next/link';
import { useLogin } from '~/hooks';
import { Box, Button, ForgotPasswordModal, FormInputController, Image, Layout, Spinner } from '..';
import {
  StyledAccountText,
  StyledLoginBox,
  StyledLoginFormBox,
  StyledLoginFormSideBox,
  StyledLoginImageBox,
  StyledLoginInputBox,
  StyledLoginTitle,
} from './styles';

const Login = () => {
  const { control, handleSubmit, isLoading, onSubmit, handleModalIsOpen, handleGoogleSignIn } =
    useLogin();

  return (
    <Layout>
      <ForgotPasswordModal />
      <StyledLoginBox>
        {isLoading ? (
          <Spinner />
        ) : (
          <StyledLoginFormSideBox>
            <StyledLoginFormBox>
              <StyledLoginImageBox>
                <Image src="/images/logo_transparent.png" alt="Logotipo closeup" fill />
              </StyledLoginImageBox>
              <StyledLoginInputBox onSubmit={handleSubmit(onSubmit)}>
                <StyledLoginTitle>Iniciar Sesión</StyledLoginTitle>

                <FormInputController
                  options={{ required: true }}
                  control={control}
                  name="email"
                  label="Email"
                  type="text"
                />
                <FormInputController
                  control={control}
                  options={{
                    required: true,
                  }}
                  name="password"
                  label="Password"
                  type="password"
                />
                <Button fullWidth type="submit">
                  Iniciar
                  <ArrowForwardIosIcon sx={{ fontSize: '0.95rem' }} />
                </Button>
                <Button fullWidth onClick={handleGoogleSignIn}>
                  <GoogleIcon sx={{ fontSize: '1.25rem' }} />
                  GOOGLE
                </Button>
              </StyledLoginInputBox>
              <Box gap="10px">
                <StyledAccountText onClick={handleModalIsOpen}>
                  ¿Olvidaste tu contraseña?
                </StyledAccountText>
                <Link href="/register">
                  <StyledAccountText>¿No tienes cuenta?</StyledAccountText>
                </Link>
              </Box>
            </StyledLoginFormBox>
          </StyledLoginFormSideBox>
        )}
      </StyledLoginBox>
    </Layout>
  );
};

export default Login;
