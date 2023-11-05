'use client';
import { Box, Modal, Spinner } from '..';
import { StepEmail, StepNewPassword, StepOtpCode } from './components';
import { useHandleForgotPassword } from './hooks';
import { StyledModalContainer } from './styles';

const ForgotPasswordModal = () => {
  const {
    handleSubmit,
    control,
    onSubmit,
    handleModalIsOpen,
    isModalOpen,
    forgotStep,
    getFormState,
    isLoading,
    getValues,
  } = useHandleForgotPassword();

  return (
    <Modal open={isModalOpen} onClose={handleModalIsOpen}>
      <StyledModalContainer>
        <Box width="100%" height="100%" justifyContent="space-around" alignItems="center">
          {isLoading ? (
            <Spinner />
          ) : (
            <>
              {forgotStep === 0 && (
                <StepEmail control={control} onSubmit={handleSubmit(onSubmit)} />
              )}
              {forgotStep === 1 && (
                <StepOtpCode
                  control={control}
                  onSubmit={handleSubmit(onSubmit)}
                  email={getFormState().email}
                />
              )}
              {forgotStep === 2 && (
                <StepNewPassword
                  getValues={getValues}
                  control={control}
                  onSubmit={handleSubmit(onSubmit)}
                />
              )}
            </>
          )}
        </Box>
      </StyledModalContainer>
    </Modal>
  );
};

export default ForgotPasswordModal;
