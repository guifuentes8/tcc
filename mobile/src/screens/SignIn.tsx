import { TouchableOpacity } from "react-native";
import { Center, ScrollView, Text, useToast, VStack } from "native-base";

import { Controller, useForm } from "react-hook-form";
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'


import { useNavigation } from "@react-navigation/native";
import { AuthNavigatorRoutesProps } from "@routes/auth.routes";

import { Button } from "@components/Button";
import { Header } from "@components/Header";
import { Input } from "@components/Input";
import { useState } from "react";
import { useAuth } from "@hooks/useAuth";
import { AppError } from "@utils/AppError";

type FormData = {
  email: string;
  password: string;
}

const signInSchema = yup.object({
  email: yup.string().required('Informe o e-mail').email('E-mail inválido'),
  password: yup.string().required('Informe a senha').min(6, 'A senha deve ter pelo menos 6 dígitos'),
})

export function SignIn() {
  const [isLoading, setIsLoading] = useState(false)

  const toast = useToast()
  const { signIn } = useAuth()
  const navigation = useNavigation<AuthNavigatorRoutesProps>();

  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(signInSchema)
  })

  function handleGoToSignUp() {
    navigation.navigate('signUp')
  }

  async function handleSignIn({ email, password }: FormData) {

    try {
      setIsLoading(true)

      await signIn(email, password)

    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : 'Não foi possível entrar. Tente novamente mais tarde'
      setIsLoading(false)

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500'
      })

    }
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>

      <VStack pt={12} pb={8}>
        <Header title="Entre na sua conta" />
        <Center mt={8} px={8} >

          <Controller
            control={control}
            name="email"
            render={({ field: { value, onChange } }) => (
              <Input
                placeholder="E-mail"
                value={value}
                iconName="mail"
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={onChange}
                errorMessage={errors.email?.message}
              />
            )}
          />


          <Controller
            control={control}
            name="password"
            render={({ field: { value, onChange } }) => (
              <Input
                placeholder="Senha"
                value={value}
                iconName="lock"
                secureTextEntry
                onChangeText={onChange}
                errorMessage={errors.password?.message}
              />
            )}
          />

          <Button isLoading={isLoading} mt={8} title="entrar" upperCase onPress={handleSubmit(handleSignIn)} />
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