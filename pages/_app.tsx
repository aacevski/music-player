import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import React from "react";

const theme = createMuiTheme({
  overrides: {
    MuiCssBaseline: {
      "@global": {
        "*::-webkit-scrollbar": {
          width: "8px",
          height: "5px",
        },
        "*::-webkit-scrollbar-track": {
          backgroundColor: "#646464",
        },
        "*::-webkit-scrollbar-track-piece": {
          backgroundColor: "#000",
        },
        "*::-webkit-scrollbar-thumb": {
          height: "50px",
          backgroundColor: "#666",
          borderRadius: "3px",
        },
        "*::-webkit-scrollbar-corner": {
          backgroundColor: "#646464",
        },
        "*::-webkit-resizer": {
          backgroundColor: "#666",
        },
      },
    },
    MuiSlider: {
      thumb: {
        "&:hover": {
          boxShadow: "0px 0px 0px 8px rgb(245 0 87 / 16%)",
        },
        "&$focusVisible": {
          boxShadow: "0px 0px 0px 8px rgb(245 0 87 / 16%)",
        },
      },
    },
  },
});

function MyApp({ Component, pageProps }: any) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
