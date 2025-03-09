import '../styles/globals.css';
import type { AppProps } from 'next/app';
import ErrorBoundary from '../components/ErrorBoundary';
import TestBtn from '../components/TestBtn';
import InfProvider from '../context/theme-provider';
import { wrapper } from '../redux/store';
import { Provider } from 'react-redux';

function MyApp({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);
  return (
    <Provider store={store}>
      <ErrorBoundary>
        <InfProvider>
          <Component {...props.pageProps} />
          <TestBtn />
        </InfProvider>
      </ErrorBoundary>
    </Provider>
  );
}

export default MyApp;
