import { ColorModeScript } from "@chakra-ui/react";
import { Html, Head, Main, NextScript } from "next/document";
import themes from "~/themes";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <ColorModeScript initialColorMode={themes.config.initialColorMode} />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
