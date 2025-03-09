import InfProvider from '../context/theme-provider';
import '../styles/globals.css';
import { ReactNode } from 'react';
import ReduxProvider from '../components/ReduxProvider';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <InfProvider>
            <main>{children}</main>
          </InfProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
