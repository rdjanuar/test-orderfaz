import { ChakraProvider } from "@chakra-ui/react";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import type { AppProps } from "next/app";
import themes from "~/themes";
import {
  LoadingProgressProvider,
  useLoadingProgress,
} from "./components/progress";
import { useEffect } from "react";
import { Router } from "next/router";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      retry: false,
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={themes}>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <LoadingProgressProvider>
            <Component {...pageProps} />
          </LoadingProgressProvider>
        </Hydrate>
      </QueryClientProvider>
    </ChakraProvider>
  );
}
