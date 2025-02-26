import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { createTheme, ThemeProvider } from "@mui/material";
import theme from "@/utils/theme";
import StoreProvider from "./StoreProvider";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <StoreProvider>
        <AppRouterCacheProvider
          options={{ enableCssLayer: true }}
        >
          <ThemeProvider theme={theme}>
        {children}
        </ThemeProvider>
        </AppRouterCacheProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
