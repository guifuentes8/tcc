import { StatusBar } from 'react-native';
import { NativeBaseProvider } from 'native-base';

import { Routes } from '@routes/index';

import { useFonts, Inter_400Regular, Inter_600SemiBold, Inter_500Medium } from '@expo-google-fonts/inter'
import { Audiowide_400Regular } from '@expo-google-fonts/audiowide';

import { THEME } from './src/theme';

import { Loading } from '@components/Loading';

export default function App() {

  const [fontsLoaded] = useFonts({ Audiowide_400Regular, Inter_400Regular, Inter_600SemiBold, Inter_500Medium })

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle='light-content'
        backgroundColor='transparent'
        translucent
      />
      {fontsLoaded ? <Routes /> : <Loading />}
    </NativeBaseProvider>
  );
}
