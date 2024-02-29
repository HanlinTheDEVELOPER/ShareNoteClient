import {
  ChakraProvider,
  ColorModeScript,
  extendTheme,
  withDefaultColorScheme,
} from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { StepsTheme as Steps } from "chakra-ui-steps";

import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import React from "react";

const config = {
  initialColorMode: "dark", // 'dark' | 'light'
  useSystemColorMode: true,
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

const theme = extendTheme(
  config,
  withDefaultColorScheme({
    colorScheme: "brand",
    components: ["Step"],
  })
);

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
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />

        <App />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </ChakraProvider>
  </React.StrictMode>
);
