import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/config/queryClient';
import { Layout } from '@/components/layout';
import AuthProvider from '@/context/AuthProvider';
import { ToastContainer } from 'react-toastify';
import Head from 'next/head';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const isErrorPage = router.pathname === '/_error';
  const isAuthPage =
    router.pathname === '/auth' || router.pathname === '/signup';

  return (
    <QueryClientProvider client={queryClient}>
      <Head>
        <title>Inventory</title>
      </Head>

      <AuthProvider>
        {isErrorPage || isAuthPage ? (
          <Component {...pageProps} />
        ) : (
          <Layout>
            <Component {...pageProps} />
          </Layout>
        )}

        <ToastContainer />
      </AuthProvider>
    </QueryClientProvider>
  );
}
