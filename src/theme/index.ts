import { extendTheme } from "native-base";

export const THEME = extendTheme({
  colors: {
    green: {
      100: "#00FFA3",
      200: "#11EEB2",
      800: "#226060",
      900: "#124040",
    },
    gray: {
      100: "#E5E5E5",
      500: "#8A8A8A",
      900: "#262626",
    },
    white: "#FFFFFF",
    black: "#111111",
    red: {
      500: "#F75A68",
    },
  },
  fonts: {
    regular: "Inter_400Regular",
    medium: "Inter_500Medium",
    semibold: "Inter_600SemiBold",
    audiowide: "Audiowide_400Regular",
  },
  fontSizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 24,
  },
  sizes: {
    14: 56,
    33: 148,
  },

  components: {
    SliderThumb: {
      defaultProps: {
        colorScheme: "green.200",
      },
      baseStyle: ({ colorScheme }) => {
        return {
          _pressed: {
            _interactionBox: {
              borderWidth: "3",
              borderColor: colorScheme,
            },
          },
        };
      },
    },
  },
});
