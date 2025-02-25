// customTheme.ts
import { extendTheme, ThemeConfig, ThemeOverride } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const theme: ThemeOverride = extendTheme({
  config,
  colors: {
    semi_white: {
      100: "#F7F7F7",
      600: "#a8a8a8",
    },
    primary: {
      100: "#69FE98",
      200: "rgb(26, 97, 48)"
    },
  },
  styles: {
    global: {
      body: {
        bg: "#212121", 
        color: "#f7f7f7",
        minHeight: "100vh",
        margin: 0,
        padding: 0,
      },
    },
  },
});

export default theme;
