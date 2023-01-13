import { TouchableOpacity } from "react-native";
import { VStack, Center, Text, ScrollView, useToast } from "native-base";

import { Controller, useForm } from "react-hook-form";
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import { useNavigation } from "@react-navigation/native";
import { AuthNavigatorRoutesProps } from "@routes/auth.routes";

import { Header } from "@components/Header";
import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { useState } from "react";
import { api } from "@services/api";
import { AppError } from "@utils/AppError";
import { useAuth } from "@hooks/useAuth";

type FormDataProps = {
  name: string;
  email: string;
  password: string;
  password_confirm: string;
}

const signUpSchema = yup.object({
  name: yup.string().required('Informe o nome'),
  email: yup.string().required('Informe o e-mail').email('E-mail inválido'),
  password: yup.string().required('Informe a senha').min(6, 'A senha deve ter pelo menos 6 dígitos'),
  password_confirm: yup.string().required('Confirme a senha').oneOf([yup.ref('password'), null], 'A confirmação da senha não confere.')

})

export function SignUp() {

  const { signIn } = useAuth()

  const [isLoading, setIsLoading] = useState(false)

  const toast = useToast()

  const navigation = useNavigation<AuthNavigatorRoutesProps>();

  const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>({
    resolver: yupResolver(signUpSchema)
  })


  async function handleSignUp({ name, email, password, password_confirm }: FormDataProps) {
    try {
      setIsLoading(true)

      await api.post('/users', { name, email, password })
      await signIn(email, password)


    } catch (error) {
      setIsLoading(false)

      const isAppError = error instanceof AppError
      const title = isAppError ? error.message : 'Não foi possível criar a conta.'


      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500'
      })
    }
  }

  function handleGoToSignIn() {
    navigation.navigate('signIn')
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>

      <VStack pt={12} pb={8}>
        <Header title="Crie sua conta" />
        <Center mt={8} px={8} >

          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder='Nome'
                iconName="person"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.name?.message}
              />
            )}
          />



          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder='E-mail'
                keyboardType='email-address'
                iconName="mail"
                autoCapitalize='none'
                onChangeText={onChange}
                value={value}
                errorMessage={errors.email?.message}

              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (

              <Input
                placeholder='Senha'
                iconName="lock"
                secureTextEntry
                onChangeText={onChange}
                value={value}
                errorMessage={errors.password?.message}

              />

            )}
          />

          <Controller
            control={control}
            name="password_confirm"
            render={({ field: { onChange, value } }) => (

              <Input
                placeholder='Confirmar a Senha'
                secureTextEntry
                iconName="lock"
                onChangeText={onChange}
                value={value}
                onSubmitEditing={handleSubmit(handleSignUp)}
                returnKeyType="send"
                errorMessage={errors.password_confirm?.message}

              />

            )}
          />


          <Button upperCase mt={8} title="cadastrar" onPress={handleSubmit(handleSignUp)} />
        </Center>
      </VStack>

      <Center>
        <TouchableOpacity onPress={handleGoToSignIn}>
          <Text color="white" underline fontFamily="medium" fontSize="md" pb={16}>
            Já possui cadastro? Faça seu login.
          </Text>
        </TouchableOpacity>
      </Center>

    </ScrollView>
  )
}