import { TouchableOpacity } from "react-native";
import { VStack, Center, Text, ScrollView } from "native-base";

import { useNavigation } from "@react-navigation/native";
import { AuthNavigatorRoutesProps } from "@routes/auth.routes";

import { Header } from "@components/Header";
import { Input } from "@components/Input";
import { Button } from "@components/Button";

export function SignIn() {

  const navigation = useNavigation<AuthNavigatorRoutesProps>();

  function handleGoToSignIn() {
    navigation.navigate('signUp')
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>

      <VStack pt={12} pb={8}>
        <Header title="Crie sua conta" />
        <Center mt={8} px={8} >
          <Input
            placeholder="Nome"
            iconName="person"
            onChangeText={() => { }}
          />

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

          <Input
            placeholder="Confirme a sua senha"
            iconName="lock"
            secureTextEntry
            // value=""
            returnKeyType="send"
            onChangeText={() => { }}

          />
          <Button mt={8} title="cadastrar" />
        </Center>
      </VStack>

      <Center>
        <TouchableOpacity onPress={handleGoToSignIn}>
          <Text color="white" underline fontFamily="regular" fontSize="sm" pb={16}>
            Já possui cadastro? Faça seu login.
          </Text>
        </TouchableOpacity>
      </Center>

    </ScrollView>
  )
}