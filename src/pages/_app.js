import Layout from "$/components/global/Layout";
import React from "react";
import "$/styles/globals.css";

const UTube = ({ Component, pageProps }) => {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
};

export default UTube;
