import { Platform } from 'react-native'

import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack'
import { createBottomTabNavigator, BottomTabNavigationProp } from '@react-navigation/bottom-tabs'

import { CurrencyCircleDollar } from 'phosphor-react-native'

import { Questionary } from '@screens/Questionary'
import { Welcome } from '@screens/Welcome'
import { Box, Icon, useTheme } from 'native-base';
import { QuestionaryItem } from '@screens/QuestionaryItem'
import { Dashboard } from '@screens/Dashboard'

type StackAppRoutes = {
  welcome: undefined;
  questionary: undefined;
  questionaryItem: undefined;
  tabDashboard: undefined;

}

type TabAppRoutes = {
  dashboard: undefined;
  dash: undefined;

}

export type AppNavigatorStackRoutesProps = NativeStackNavigationProp<StackAppRoutes>;
export type AppNavigatorTabRoutesProps = BottomTabNavigationProp<TabAppRoutes>;


export function AppRoutes() {

  const { sizes, colors } = useTheme()

  const Stack = createNativeStackNavigator<StackAppRoutes>();
  const Tab = createBottomTabNavigator<TabAppRoutes>();


  function TabDashboard() {
    return (
      <Tab.Navigator screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: colors.green[500],
        tabBarInactiveTintColor: colors.gray[200],
        tabBarStyle: {

          backgroundColor: colors.green[800],
          borderTopWidth: 0,
          height: Platform.OS === "android" ? 'auto' : 96,
          paddingBottom: sizes[16],
          paddingTop: sizes[4],
          paddingHorizontal: sizes[4],
        }
      }}
      >
        <Tab.Screen
          name="dashboard"
          component={Dashboard}
          options={{
            tabBarButton: () => (
              <Box
                bg="green.100"
                alignItems="center"
                justifyContent="center"
                rounded="full"
                width={12}
                height={12}
              >
                <Icon
                  as={<CurrencyCircleDollar color={colors.green[900]} weight="regular" size={40} />}
                />
              </Box>

            )
          }}
        />
        <Tab.Screen
          name="dash"
          component={Dashboard}
          options={{

            tabBarButton: () => (
              <Box
                bg="green.100"
                alignItems="center"
                justifyContent="center"
                rounded="full"
                width={12}
                height={12}
              >
                <Icon
                  as={<CurrencyCircleDollar color={colors.green[900]} weight="regular" size={40} />}
                />
              </Box>

            )
          }}
        />

      </Tab.Navigator>
    )
  }

  function QuestionaryRoute() {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* <Stack.Screen
          name="welcome"
          component={Welcome}
        />

        <Stack.Screen
          name="questionary"
          component={Questionary}
        />
        <Stack.Screen
          name="questionaryItem"
          component={QuestionaryItem}
        /> */}

        <Stack.Screen
          name="tabDashboard"
          component={TabDashboard}

        />

      </Stack.Navigator>
    )
  }

  return (
    <QuestionaryRoute />
  )
}