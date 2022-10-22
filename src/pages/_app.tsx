// src/pages/_app.tsx
import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { AuthProvider } from "../contexts/authentication"
import type { Session } from "next-auth";
import type { AppType } from "next/app";
import { trpc } from "../utils/trpc";
import { ThemeProvider } from "../contexts/theme";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <SessionProvider session={session}>
          <Component {...pageProps} />
        </SessionProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default trpc.withTRPC(MyApp);
