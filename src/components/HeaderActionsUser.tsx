import { TouchableOpacity } from "react-native";
import { Text, Center, VStack, useTheme, HStack } from "native-base";
import { House } from 'phosphor-react-native'
import LogoSVG from '@assets/logo.svg'
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorTabRoutesProps } from "@routes/app.routes";


type Props = {
  title: string;
  subtitle: string;
}

export function HeaderActionsUser({ title, subtitle }: Props) {

  const { colors } = useTheme()
  const navigation = useNavigation<AppNavigatorTabRoutesProps>()

  function handleNavigateToDashboard() {
    navigation.navigate("dashboard")
  }

  return (
    <VStack mb={8}>
      <HStack justifyContent="space-between" alignItems="center">
        <TouchableOpacity onPress={handleNavigateToDashboard}>
          <House color={colors.green[100]} size={32} />
        </TouchableOpacity>
        <Text mt={2} color="green.100" fontSize="md" fontFamily="audiowide">
          Guilherme Fuentes
        </Text>
        <LogoSVG height={48} width={48} />
      </HStack>
      <Center mt={6}>
        <Text fontFamily="audiowide" fontSize="xl" color="green.100">
          {title}
        </Text>
        <Text textAlign="center" mt={4} fontFamily="regular" fontSize="lg" color="green.100">
          {subtitle}
        </Text>
      </Center>
    </VStack>
  )
}