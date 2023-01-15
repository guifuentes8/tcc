import { TouchableOpacity } from "react-native";
import { Text, Center, VStack, useTheme, HStack, Image } from "native-base";
import { House, SignOut } from 'phosphor-react-native'
import LogoSVG from '@assets/logo.svg'
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorStackRoutesProps, AppNavigatorTabRoutesProps } from "@routes/app.routes";
import { useAuth } from "@hooks/useAuth";
import userPhotoDefault from '@assets/userPhotoDefault.png'
import { api } from "@services/api";


type Props = {
  title: string;
  subtitle: string;
  profile?: boolean;
}

export function HeaderActionsUser({ title, subtitle, profile = false }: Props) {

  const { colors } = useTheme()
  const { user, signOut } = useAuth()


  const navigation = useNavigation<AppNavigatorTabRoutesProps>()
  const navigationStack = useNavigation<AppNavigatorStackRoutesProps>()


  function handleNavigateToProfile() {
    navigationStack.navigate("profile")
  }
  function handleNavigateToDashboard() {
    navigation.navigate("dashboard")
  }

  return (
    <VStack mb={profile ? 0 : 8}>
      <HStack justifyContent="space-between" alignItems="center">
        <TouchableOpacity onPress={profile ? handleNavigateToProfile : handleNavigateToDashboard}>
          {profile ?
            <Image alt="Imagem do usuário" w={10} h={10} rounded="full"
              source={user.avatar ? { uri: `${api.defaults.baseURL}/avatar/${user.avatar}` } : userPhotoDefault} />
            :
            <House color={colors.green[100]} size={32} />}

        </TouchableOpacity>
        <Center>
          <LogoSVG height={48} width={48} />
          <Text textTransform="capitalize" mt={2} color="green.100" fontSize="md" fontFamily="audiowide">
            {user.name}
          </Text>
        </Center>
        <TouchableOpacity onPress={signOut}>
          <SignOut color={colors.green[100]} size={32} />
        </TouchableOpacity>
      </HStack>
      {!profile &&
        <Center mt={6}>
          <Text fontFamily="audiowide" fontSize="xl" color="green.100">
            {title}
          </Text>
          <Text textAlign="center" mt={4} fontFamily="regular" fontSize="lg" color="green.100">
            {subtitle}
          </Text>
        </Center>
      }
    </VStack>
  )
}