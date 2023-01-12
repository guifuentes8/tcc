import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { useTheme, Box } from "native-base";
import { AuthRoutes } from "./auth.routes";
import { AppRoutes } from "./app.routes";
import { SafeAreaView } from "react-native-safe-area-context";

export function Routes() {
  const { colors } = useTheme();
  const theme = DefaultTheme;
  theme.colors.background = colors.green[900];

  return (
    <Box flex={1} bg="green.900">
      <NavigationContainer theme={theme}>
        <AppRoutes />
        {/* <AuthRoutes /> */}
      </NavigationContainer>
    </Box>
  )
}