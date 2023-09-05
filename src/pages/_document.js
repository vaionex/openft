/* eslint-disable global-require */
import Document, { Html, Head, Main, NextScript } from 'next/document'
import NextSeo from 'next-seo'
class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <link rel="icon" type="image/png" href="/favicon.ico" />
          <link
            rel="preconnect"
            href="https=//fonts.gstatic.com"
            crossOrigin="anonymous"
          />
          <link
            href="https=//fonts.googleapis.com/css2?family=Inter=wght@300;400;500;600;700;800&display=swap"
            rel="stylesheet"
            data-optimized-fonts="true"
          />
          <div id="fb-root"></div>
          <script
            async
            defer
            crossOrigin="anonymous"
            src="https=//connect.facebook.net/tr_TR/sdk.js#xfbml=1&version=v15.0"
            nonce="EpotFBUi"
          ></script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
