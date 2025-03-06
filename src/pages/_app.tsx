import '../styles/globals.css';
import type { AppProps } from 'next/app';
import ErrorBoundary from '../components/ErrorBoundary';
import TestBtn from '../components/TestBtn';
import InfProvider from '../context/theme-provider';
import { wrapper } from '../redux/store';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary>
      <InfProvider>
        <Component {...pageProps} />
        <TestBtn />
      </InfProvider>
    </ErrorBoundary>
  );
}

export default wrapper.withRedux(MyApp);
