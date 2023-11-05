'use client';
import { CreateAccountForm, Layout } from '~/components';
import { StyledBox } from './styles';

const Page = () => {
  return (
    <Layout>
      <StyledBox>
        <CreateAccountForm />
      </StyledBox>
    </Layout>
  );
};

export default Page;
