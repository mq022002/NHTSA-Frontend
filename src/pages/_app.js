import "../styles/globals.css";
import "../styles/custom.css";
import BaseLayout from "../components/layouts/BaseLayout";
import { SessionProvider } from "next-auth/react";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <BaseLayout>
        <Component {...pageProps} />
      </BaseLayout>
    </SessionProvider>
  );
}
