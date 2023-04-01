import { NextSeo } from 'next-seo';
import { Suspense } from 'react';

const RootLayout = ({ children }) => {
  return (
    <>
      <NextSeo
        title="NFTana"
        description="The open source NFT marketplace on BSV"
        openGraph={{
          type: 'website',
          locale: 'en_US',
          url: 'https://NFTana.com',
          site_name: 'NFTana',
          images: [
            {
              url: 'https://i.imgur.com/HDPcB1o.jpg',
              alt: 'NFtana Social Card',
              width: 1447,
              height: 885,
            },
          ],
        }}
        twitter={{
          handle: '@relysia',
          site: '@relysia',
          cardType: 'summary_large_image',
        }}
      />
      {children}
    </>
  );
};

export default RootLayout;