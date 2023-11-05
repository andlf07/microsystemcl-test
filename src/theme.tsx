import { Inter } from 'next/font/google';
import { createTheme } from '@mui/material/styles';

export const inter = Inter({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['Helvetica', 'Arial', 'sans-serif'],
});

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 240,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },

  typography: {
    fontFamily: inter.style.fontFamily,
  },
});

export default theme;
