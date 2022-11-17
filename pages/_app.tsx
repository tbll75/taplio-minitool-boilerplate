import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import { theme } from "utils/theme";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <SessionProvider session={session}>
        {
          // @ts-ignore
          <Component {...pageProps} />
        }
        <div>
          <Toaster />
        </div>
      </SessionProvider>
    </ChakraProvider>
  );
}

export default MyApp;
