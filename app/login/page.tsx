'use client';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import GoogleIcon from '@mui/icons-material/Google';
import Link from 'next/link';
import {
  Box,
  Button,
  ForgotPasswordModal,
  FormInputController,
  Image,
  Layout,
  Spinner,
  Text,
} from '~/components';
import { useLogin } from '~/hooks';
import { StyledLoginFormBox, StyledLoginFormSideBox, StyledLoginInputBox } from './styles';

const Page = () => {
  const { control, handleSubmit, isLoading, onSubmit, handleModalIsOpen, handleGoogleSignIn } =
    useLogin();

  return (
    <Layout>
      <ForgotPasswordModal />
      <Box
        direction="row"
        height="100%"
        justifyContent="center"
        alignItems="center"
        marginTop="20px"
      >
        {isLoading ? (
          <Spinner />
        ) : (
          <StyledLoginFormSideBox>
            <StyledLoginFormBox>
              <Box width="150px" height="150px">
                <Image src="/images/logo_transparent.png" alt="Logotipo closeup" fill />
              </Box>
              <StyledLoginInputBox onSubmit={handleSubmit(onSubmit)}>
                <Text fontSize="2.125rem" fontWeight="400" textAlign="center">
                  Iniciar Sesión
                </Text>

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
                  GOOGLE SIGNIN
                </Button>
              </StyledLoginInputBox>
              <Box gap="10px">
                <Text
                  fontSize="1rem"
                  fontWeight="400"
                  textAlign="center"
                  color="#555273"
                  onClick={handleModalIsOpen}
                  sx={{
                    textDecoration: 'underline',
                    '&:hover': {
                      cursor: 'pointer',
                    },
                  }}
                >
                  ¿Olvidaste tu contraseña?
                </Text>
                <Link href="/register">
                  <Text
                    fontSize="1rem"
                    fontWeight="400"
                    textAlign="center"
                    color="#555273"
                    sx={{
                      textDecoration: 'underline',
                      '&:hover': {
                        cursor: 'pointer',
                      },
                    }}
                  >
                    ¿No tienes cuenta?
                  </Text>
                </Link>
              </Box>
            </StyledLoginFormBox>
          </StyledLoginFormSideBox>
        )}
      </Box>
    </Layout>
  );
};
export default Page;
