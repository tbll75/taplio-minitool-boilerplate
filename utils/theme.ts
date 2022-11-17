import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  config: {
    useSystemColorMode: false,
  },
  styles: {
    global: {
      body: {
        bg: "linear-gradient(96.86deg, #FEFEFF 3.49%, #EAEBFF 94.63%)",
        color: "black",
      },
    },
  },
  shadows: {
    "light-lg": 'rgba(255, 255, 255, 0.1) 0px 0px 0px 1px, rgba(255, 255, 255, 0.1) 0px 5px 10px, rgba(255, 255, 255, 0.2) 0px 1px 30px'
  }
});
