import "../styles/globals.css";
import "../styles/custom.css";
import BaseLayout from "../components/layouts/BaseLayout";
import { SessionProvider } from "../context/SessionContext";

export default function App({ Component, pageProps }) {
  return (
    <SessionProvider>
      <BaseLayout>
        <Component {...pageProps} />
      </BaseLayout>
    </SessionProvider>
  );
}
