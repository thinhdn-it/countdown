import Head from 'next/head';
import '../styles/globals.css';

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>TVT Technology</title>
        <link rel="icon" href="/logo.png" type="image/jpeg" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
