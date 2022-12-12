import { useEffect } from "react";
import Head from "next/head";
import { Box } from "@chakra-ui/react";
import { Footer } from "./footer";
import * as Analytics from "utils/analytics";
import Script from "next/script";

interface Props {
  title?: string;
  children: React.ReactNode;
}

export function Layout({ children }: Props) {
  useEffect(() => {
    Analytics.log("visit_carousel");
  }, []);

  const title = "Linkedin Carousel Generator - LinkedIn posts and templates mean more organic traffic";
  const desc ="Turn your images, tweets or Reddit posts into LinkedIn carousels. A free tool provided by Taplio.";
  const url = "https://taplio.com/carousel";
  return (
    <Box w="100%" p={2}>
      <Head>
        <title>{title}</title>
        <link rel="shortcut icon" href="https://app.taplio.com/favicon.ico" />
        <link rel="apple-touch-icon" sizes="128x128" href="/logo/logo_128.png"></link>
        <link rel="icon" sizes="192x192" href="/logo/logo_192.png"></link>
        <link rel="canonical" href={url} />

        {/* GOOGLE TAG MANAGER - TAPLIO */}
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-NCK7Z8K');
          `}
        </Script>
        
        <meta name="description" content={desc} />
        {/* Twitter */}
        <meta name="twitter:card" content="summary" key="twcard" />
        <meta name="twitter:site" content={url} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={desc} />

        {/* Open Graph */}
        <meta property="og:url" content={url} key="ogurl" />
        <meta content="summary_large_image" name="twitter:card" />
        <meta property="og:image" content="https://ondemand.bannerbear.com/simpleurl/eN6mLGkQNNed9zbP2O/image/title/text/Linkedin%20Carousel%20Generator" key="ogimage" />
        <meta property="og:site_name" content={title} key="ogsitename" />
        <meta property="og:title" content={title} key="ogtitle" />
        <meta property="og:description" content={desc} key="ogdesc" />

        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=G-KK3KJVRHMT`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-KK3KJVRHMT', {
            page_path: window.location.pathname,
          });
        `,
          }}
        />
      </Head>
      {/* GOOGLE TAG MANAGER - TAPLIO */}
      <noscript dangerouslySetInnerHTML={{ __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-NCK7Z8K" height="0" width="0" style="display:none;visibility:hidden"></iframe>`}}></noscript>
      {/* <Header /> */}
      <Box>{children}</Box> 
      <Footer />
    </Box>
  );
}
