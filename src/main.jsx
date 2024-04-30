import { ChakraProvider, ColorModeScript, extendTheme } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { StepsTheme as Steps } from "chakra-ui-steps";

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

const config = {
  initialColorMode: "dark", // 'dark' | 'light'
  useSystemColorMode: false,

  semanticTokens: {
    colors: {
      brand: {
        900: "#46962A",
        800: "#46962A50",
        700: "#2a69ac",
      },
      back: {
        default: "#e9ebee",
        _dark: "rgb(52, 52, 52)",
      },
    },
  },

  styles: {
    global: {
      body: {
        bg: "back",
      },

      text: {
        default: "gray.900",
        _dark: "gray.50",
      },
    },
  },
  components: { Steps },
};

const theme = extendTheme(config);

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      refetchOnMount: false,
      // suspense: true,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      {localStorage.setItem("chakra-ui-color-mode", "dark")}
      <QueryClientProvider client={queryClient}>
        <ColorModeScript initialColorMode="dark" />
        <App />
        {/* <ReactQueryDevtools /> */}
      </QueryClientProvider>
    </ChakraProvider>
  </React.StrictMode>
);
