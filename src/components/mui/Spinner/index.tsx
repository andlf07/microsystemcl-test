import { CircularProgress, Stack, StackProps } from '@mui/material';

const Spinner: React.FC<StackProps> = props => {
  return (
    <Stack {...props}>
      <CircularProgress />
    </Stack>
  );
};

export default Spinner;
