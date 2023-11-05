'use client';
import { signOut } from 'next-auth/react';
import { Box, Text } from '~/components';

const Dashboard = () => {
  const handleSignOut = async () => signOut();

  return (
    <Box width="100%" direction="row" justifyContent="space-between">
      <Text variant="h1" fontSize="3rem">
        Dashboard Dashboard
      </Text>
      <Box sx={{ width: '300px' }} justifyContent="center">
        <Text
          sx={{ textDecoration: 'underline', textAlign: 'center', ':hover': { cursor: 'pointer' } }}
          onClick={handleSignOut}
        >
          Logout
        </Text>
      </Box>
    </Box>
  );
};

export default Dashboard;
