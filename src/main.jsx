import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

const config = {
  initialColorMode: "dark",
  useSystemColorMode: true,
  colors: {
    brand: {
      900: "#46962A",
      800: "#153e75",
      700: "#2a69ac",
    },
    back: {
      600: "#e9ebee",
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
  // <React.StrictMode>
  <ChakraProvider theme={theme}>
    <QueryClientProvider client={queryClient}>
      <App />
      <ReactQueryDevtools />
    </QueryClientProvider>
  </ChakraProvider>
  // </React.StrictMode>
);
