import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { StoreProvider } from '../utils/store';
import { SessionProvider } from 'next-auth/react';

export default function App({ Component, ...pageProps }: any) {
  return (
    <SessionProvider session={pageProps.session}>
      <StoreProvider>
        <Component {...pageProps} />
      </StoreProvider>
    </SessionProvider>
  );
}
