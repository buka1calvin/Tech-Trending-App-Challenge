'use client';
import { createTheme } from '@mui/material/styles';
import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const theme = createTheme({
    palette:{
        primary:{
            main:'#8D57FA'
        }
    },
  typography: {
    fontFamily: inter.style.fontFamily,
  },
  shape:{
    borderRadius:0
  }
});

export default theme;