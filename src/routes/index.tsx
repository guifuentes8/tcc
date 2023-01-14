import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { useTheme, Box } from "native-base";

import { AuthRoutes } from "./auth.routes";
import { AppRoutes } from "./app.routes";

import { useAuth } from "@hooks/useAuth";

import { Loading } from "@components/Loading";

export function Routes() {
  const { user, isLoadingUserStorageData } = useAuth()
  const { colors } = useTheme();

  // console.log(user)

  const theme = DefaultTheme;
  theme.colors.background = colors.green[900];

  if (isLoadingUserStorageData) {
    return <Loading />
  }

  return (
    <Box flex={1} bg="green.900">
      <NavigationContainer theme={theme}>
        {user?.id ? <AppRoutes /> : <AuthRoutes />}
      </NavigationContainer>
    </Box>
  )
}