import Document, { Html, Head, Main, NextScript } from 'next/document';
class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="icon" sizes="any" href="./favicon.svg" type="image/svg+xml" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="theme-color" content="#000000" />
          <link rel="apple-touch-icon" href="./favicon.svg" type="image/svg+xml" />
          <link rel="apple-touch-icon" href="./apple-touch-icon.png" type="image/png" />
          <link rel="mask-icon" href="./favicon.svg" color="black" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="black" />
          <meta property="og:image" content="https://hakqlo.github.io/icon/logoOGP.png" />
          <meta property="og:site_name" content="Hakqlo App" />
          <meta property="og:description" content="Hakqlo the technology community's PWA app" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
export default MyDocument;