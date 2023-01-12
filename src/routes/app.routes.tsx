import { Platform } from 'react-native'

import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack'
import { createBottomTabNavigator, BottomTabNavigationProp } from '@react-navigation/bottom-tabs'

import { CaretCircleDoubleUp, CurrencyCircleDollar, Lightbulb } from 'phosphor-react-native'

import { Questionary } from '@screens/Questionary'
import { Welcome } from '@screens/Welcome'
import { Box, Icon, useTheme } from 'native-base';
import { QuestionaryItem } from '@screens/QuestionaryItem'
import { Dashboard } from '@screens/Dashboard'
import { Economize } from '@screens/Economize'
import { Consumo } from '@screens/Consumo'
import { Ranking } from '@screens/Ranking'

type StackAppRoutes = {
  welcome: undefined;
  questionary: undefined;
  questionaryItem: undefined;
  dashboardTab: undefined;

}

type TabAppRoutes = {
  dashboard: undefined;
  economize: undefined;
  consumo: undefined;
  ranking: undefined;

}

export type AppNavigatorStackRoutesProps = NativeStackNavigationProp<StackAppRoutes>;
export type AppNavigatorTabRoutesProps = BottomTabNavigationProp<TabAppRoutes>;

export function AppRoutes() {

  const { sizes, colors } = useTheme()
  const iconSize = 9;

  const Stack = createNativeStackNavigator<StackAppRoutes>();
  const Tab = createBottomTabNavigator<TabAppRoutes>();


  function TabRoute() {
    return (
      <Tab.Navigator screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.green[500],
        tabBarInactiveTintColor: colors.gray[200],
        tabBarStyle: {
          backgroundColor: colors.green[800],
          borderTopWidth: 0,
          height: Platform.OS === "android" ? 'auto' : 96,
          paddingBottom: sizes[10],
          paddingTop: sizes[8]
        }
      }}
      >
        <Tab.Screen
          name="dashboard"
          component={Dashboard}
          options={{
            tabBarButton: () => null
          }}
        />

        <Tab.Screen
          name="economize"
          component={Economize}
          options={{
            tabBarIcon: () => (
              <Box
                bg="green.100"
                alignItems="center"
                justifyContent="center"
                rounded="full"
                width={iconSize}
                height={iconSize}
              >
                <Icon
                  as={<CurrencyCircleDollar color={colors.green[900]} weight="regular" size={32} />}
                />
              </Box>

            )
          }}
        />
        <Tab.Screen
          name="consumo"
          component={Consumo}
          options={{
            tabBarIcon: () => (
              <Box
                bg="green.100"
                alignItems="center"
                justifyContent="center"
                rounded="full"
                width={iconSize}
                height={iconSize}
              >
                <Icon
                  as={<Lightbulb color={colors.green[900]} weight="regular" size={32} />}
                />
              </Box>

            )
          }}
        />
        <Tab.Screen
          name="ranking"
          component={Ranking}
          options={{
            tabBarIcon: () => (
              <Box
                bg="green.100"
                alignItems="center"
                justifyContent="center"
                rounded="full"
                width={iconSize}
                height={iconSize}
              >
                <Icon
                  as={<CaretCircleDoubleUp color={colors.green[900]} weight="regular" size={32} />}
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
        /> */}
        {/* <Stack.Screen
          name="questionaryItem"
          component={QuestionaryItem}
        /> */}

        <Stack.Screen
          name="dashboardTab"
          component={TabRoute}

        />

      </Stack.Navigator>
    )
  }

  return (
    <QuestionaryRoute />
  )
}