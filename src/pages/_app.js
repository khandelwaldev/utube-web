import Layout from "$/components/global/Layout";
import React from "react";
import "$/styles/globals.css";
import { NextSeo } from "next-seo";

const UTube = ({ Component, pageProps }) => {
  return (
    <>
      <NextSeo
        title="UTube"
        // titleTemplate="UTube"
        defaultTitle="UTube"
        description="Enjoy the videos and music you love, upload original content, and share it all with friends, family, and the world on UTube."
        canonical="https://utube-web.vercel.app/"
        openGraph={{
          url: "https://utube-web.vercel.app/",
          title: "UTube",
          description:
            "Enjoy the videos and music you love, upload original content, and share it all with friends, family, and the world on UTube.",
          images: [
            {
              url: "/og-image.png",
              width: 800,
              height: 420,
              alt: "UTube",
            },
          ],
        }}
        twitter={{
          handle: "@i_slyro",
          site: "@i_slyro",
          cardType: "summary_large_image",
        }}
      />

      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
};

export default UTube;
