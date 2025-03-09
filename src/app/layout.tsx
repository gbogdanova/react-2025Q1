import InfProvider from '../context/theme-provider';
import '../styles/globals.css';
import { ReactNode, Suspense } from 'react';
import ReduxProvider from '../components/ReduxProvider';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <InfProvider>
            <Suspense>
              <main>{children}</main>
            </Suspense>
          </InfProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
