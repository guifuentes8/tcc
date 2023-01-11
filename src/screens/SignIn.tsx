import { TouchableOpacity } from "react-native";
import { Center, ScrollView, Text, VStack } from "native-base";

import { useNavigation } from "@react-navigation/native";
import { AuthNavigatorRoutesProps } from "@routes/auth.routes";

import { Button } from "@components/Button";
import { Header } from "@components/Header";
import { Input } from "@components/Input";


export function SignIn() {

  const navigation = useNavigation<AuthNavigatorRoutesProps>();

  function handleGoToSignUp() {
    navigation.navigate('signUp')
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>

      <VStack pt={12} pb={8}>
        <Header title="Entre na sua conta" />
        <Center mt={8} px={8} >

          <Input
            placeholder="E-mail"
            iconName="mail"
            keyboardType="email-address"
            autoCapitalize="none"
            // value=""
            onChangeText={() => { }}

          />

          <Input
            placeholder="Senha"
            iconName="lock"
            secureTextEntry
            // value=""
            onChangeText={() => { }}
          />

          <Button mt={8} title="entrar" upperCase />
        </Center>
      </VStack>

      <Center>
        <TouchableOpacity onPress={handleGoToSignUp}>
          <Text color="white" underline fontFamily="regular" fontSize="md" pb={16}>
            Não possui conta? Crie uma agora!
          </Text>
        </TouchableOpacity>
      </Center>

    </ScrollView>
  )
}