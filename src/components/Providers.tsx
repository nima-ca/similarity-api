"use client";

import { FunctionComponent, ReactNode } from "react";
import { ThemeProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";

interface ProvidersProps {
  children: ReactNode;
}

const Providers: FunctionComponent<ProvidersProps> = ({ children }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <SessionProvider>{children}</SessionProvider>
    </ThemeProvider>
  );
};

export default Providers;
