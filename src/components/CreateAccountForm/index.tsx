'use client';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useCreateAccount } from '~/hooks';
import { Box, Image, Spinner } from '..';
import { AccountForm } from './components';
import { StyledBox, StyledCreateAccountButton } from './styles';

const CreateAccountForm = () => {
  const { control, handleSubmit, loading, onSubmit, getValues, errors } = useCreateAccount();

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <StyledBox onSubmit={handleSubmit(onSubmit)}>
          <Box width="150px" height="150px">
            <Image src="/images/logo_transparent.png" alt="Logotipo closeup" fill />
          </Box>
          <AccountForm control={control} getValues={getValues} errors={errors} />

          <StyledCreateAccountButton type="submit" variant="contained" size="large">
            CREAR CUENTA
            <ArrowForwardIosIcon sx={{ fontSize: '0.95rem' }} />
          </StyledCreateAccountButton>
        </StyledBox>
      )}
    </>
  );
};

export default CreateAccountForm;
