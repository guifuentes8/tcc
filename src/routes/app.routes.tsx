import { Platform } from 'react-native'

import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack'
import { createBottomTabNavigator, BottomTabNavigationProp } from '@react-navigation/bottom-tabs'

import { Questionary } from '@screens/Questionary'
import { Welcome } from '@screens/Welcome'
import { useTheme } from 'native-base';
import { QuestionaryItem } from '@screens/QuestionaryItem'
import { Dashboard } from '@screens/Dashboard'

type StackAppRoutes = {
  welcome: undefined;
  questionary: undefined;
  questionaryItem: undefined;
  dashboard: undefined;

}

type TabAppRoutes = {
  questionary: undefined;
}

export type AppNavigatorStackRoutesProps = NativeStackNavigationProp<StackAppRoutes>;
export type AppNavigatorTabRoutesProps = BottomTabNavigationProp<TabAppRoutes>;


export function AppRoutes() {

  const { sizes, colors } = useTheme()

  const Stack = createNativeStackNavigator<StackAppRoutes>();
  const Tab = createBottomTabNavigator<TabAppRoutes>();


  function HomeRoute() {
    return (
      <Tab.Navigator screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: colors.green[500],
        tabBarInactiveTintColor: colors.gray[200],
        tabBarStyle: {
          backgroundColor: colors.gray[600],
          borderTopWidth: 0,
          height: Platform.OS === "android" ? 'auto' : 96,
          paddingBottom: sizes[10],
          paddingTop: sizes[6]
        }
      }
      }>

        <Tab.Screen
          name="questionary"
          component={Questionary}
          options={{
            tabBarButton: () => null
          }}
        />

      </Tab.Navigator>
    )
  }

  function QuestionaryRoute() {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
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
        />
        <Stack.Screen
          name="dashboard"
          component={Dashboard}
        />

      </Stack.Navigator>
    )
  }

  return (
    <QuestionaryRoute />
  )
}