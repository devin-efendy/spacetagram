import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { CookiesProvider } from "react-cookie";

import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CookiesProvider>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </CookiesProvider>
  );
}

export default MyApp;
