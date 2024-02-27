import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import React from "react";

const config = {
  colors: {
    brand: {
      900: "#46962A",
      800: "#46962A50",
      700: "#2a69ac",
    },
    back: {
      600: "#e9ebee",
    },
  },
  styles: {
    global: {
      body: {
        bg: "back.600",
      },
    },
  },
};

const theme = extendTheme(config);

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      refetchOnMount: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <App />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </ChakraProvider>
  </React.StrictMode>
);
