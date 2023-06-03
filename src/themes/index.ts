import { type ThemeConfig, extendTheme } from "@chakra-ui/react";
import { colors, fonts } from "./foundations";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const overrides = {
  colors,
  config,
  fonts,
};

export default extendTheme(overrides);
