import 'tailwindcss/tailwind.css';

import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import relativeTime from 'dayjs/plugin/relativeTime';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';

import { Head } from '../components/Head';
import { LoadingScreen } from '../components/LoadingScreen';
import { AuthProvider } from '../contexts/AuthContext';
import { useIsMounted } from '../hooks/useIsMounted';
import AuthLayout from '../layouts/AuthLayout';
import MainLayout from '../layouts/MainLayout';

dayjs.extend(localizedFormat);
dayjs.extend(relativeTime);

function App({ Component, pageProps, router }: AppProps) {
  const isMounted = useIsMounted();

  if (!isMounted) {
    return <LoadingScreen />;
  }

  if (pageProps.isErrorPage) {
    return <Component {...pageProps} />;
  }

  const Layout = router.pathname.startsWith('/auth') ? AuthLayout : MainLayout;

  return (
    <AuthProvider>
      <Layout>
        <Head />
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  );
}

export default App;
