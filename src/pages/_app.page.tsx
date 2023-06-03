import { ChakraProvider } from "@chakra-ui/react";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import type { AppProps } from "next/app";
import { LoadingProgressProvider } from "~/components";
import themes from "~/themes";

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
