import { Head, Html, Main, NextScript } from "next/document";
import React from "react";

const Document = () => {
  return (
    <Html lang="en" className="scroll-smooth">
      <Head />
      <body className="bg-primaryBg text-primaryText">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
