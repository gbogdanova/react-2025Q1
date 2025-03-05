import '../styles/globals.css';
import type { AppProps } from 'next/app';
// import InfProvider from '../context/planets-proveder';
import ErrorBoundary from '../components/ErrorBoundary';
import TestBtn from '../components/TestBtn';
// import { Provider } from 'react-redux';
// import { store } from '../redux/store';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary>
      {/* <Provider store={store}>
        <InfProvider> */}
      <Component {...pageProps} />
      <TestBtn />
      {/* </InfProvider>
      </Provider> */}
    </ErrorBoundary>
  );
}
