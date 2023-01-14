import { useState } from "react";

import { TouchableOpacity } from "react-native";
import { Center, ScrollView, VStack, Skeleton, Text, Heading, useToast, Image } from "native-base";
import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system';
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import { Input } from "@components/Input";
import { Button } from "@components/Button";

import { Controller, useForm } from "react-hook-form";
import { useAuth } from "@hooks/useAuth";
import { api } from "@services/api";
import { AppError } from "@utils/AppError";

import userPhotoDefault from '@assets/userPhotoDefault.png'
import { HeaderActionsUser } from "@components/HeaderActionsUser";

const PHOTO_SIZE = 33;

type FormDataProps = {
  name: string;
  email: string;
  password: string;
  old_password: string;
  confirm_password: string;
}

const profileSchema = yup.object({
  name: yup.string().required('Informe o nome'),
  password: yup
    .string()
    .min(6, 'A senha deve ter pelo menos 6 dígitos')
    .nullable()
    .transform((value) => !!value ? value : null),
  confirm_password: yup
    .string()
    .nullable()
    .transform((value) => !!value ? value : null)
    .oneOf([yup.ref('password'), null], 'A confirmação de senha não confere.')
    .when('password', {
      is: (Field: any) => Field,
      then: yup
        .string()
        .nullable()
        .required('Informe a confirmação da senha')
        .transform((value) => !!value ? value : null)
    })
})

export function Profile() {
  const [isUpdating, setIsUpdating] = useState(false)
  const [photoIsLoading, setPhotoIsLoading] = useState(false)

  const toast = useToast()
  const { user, updateUserProfile } = useAuth()

  const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>({
    defaultValues: {
      name: user.name,
      email: user.email
    },
    resolver: yupResolver(profileSchema)
  })

  async function handleUserPhotoSelect() {
    setPhotoIsLoading(true)
    try {
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true,
      });

      if (photoSelected.canceled) {
        return;
      }

      if (photoSelected?.assets[0].uri) {

        const photoInfo = await FileSystem.getInfoAsync(photoSelected.assets[0].uri)

        if (photoInfo.size && photoInfo.size / 1024 / 1024 > 5) {

          return toast.show({
            title: 'Essa imagem é muito grande. Escolha uma de até 5MB.',
            placement: 'top',
            bgColor: 'red.500'
          })
        }

        const fileExtension = photoSelected?.assets[0].uri.split('.').pop()

        const photoFile = {
          name: `${user.name}.${fileExtension}`.toLowerCase(),
          uri: photoSelected?.assets[0].uri,
          type: `${photoSelected?.assets[0].type}/${fileExtension}`
        } as any;

        const userPhotoUploadForm = new FormData()
        userPhotoUploadForm.append('avatar', photoFile)

        console.log(userPhotoUploadForm)


        const avatarUpdatedResponse = await api.patch('/users/avatar', userPhotoUploadForm, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })

        const userUpdated = user;
        userUpdated.avatar = avatarUpdatedResponse.data.avatar;

        updateUserProfile(userUpdated)

        toast.show({
          title: 'Foto atualizada',
          placement: 'top',
        })
      }

    } catch (error) {
      console.log(error)
    } finally {
      setPhotoIsLoading(false)
    }

  }

  async function handleProfileUpdate(data: FormDataProps) {
    try {
      setIsUpdating(true)

      const userUpdated = user;
      userUpdated.name = data.name

      await api.put('/users', data)

      await updateUserProfile(userUpdated)

      toast.show({
        title: 'Perfil atualizado com sucesso!',
        placement: 'top',
        bgColor: 'green.100'
      })

    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError ? error.message : 'Não foi possível carregar o histórico.'
      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500'
      })
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <VStack flex={1} mt={12} px={8}>
      <HeaderActionsUser title="Perfil" subtitle="" />

      <ScrollView mt={-12} showsVerticalScrollIndicator={false}>
        <Center>
          {
            photoIsLoading ?
              <Skeleton
                w={PHOTO_SIZE}
                h={PHOTO_SIZE}
                rounded="full"
                startColor="gray.500"
                endColor="gray.400"
              />
              :
              <Image alt="Foto do usuário" size={PHOTO_SIZE} rounded="full"
                source={user.avatar ? { uri: `${api.defaults.baseURL}/avatar/${user.avatar}` } : userPhotoDefault} />
          }

          <TouchableOpacity onPress={handleUserPhotoSelect}>
            <Text color="green.100" fontWeight="bold" fontSize="md" mt={2} mb={8}>
              Alterar foto
            </Text>
          </TouchableOpacity>
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
                isDisabled
                onChangeText={onChange}
                value={value}
                errorMessage={errors.email?.message}

              />
            )}
          />

        </Center>

        <VStack mt={2} mb={9}>
          <Heading color="green.100" fontSize="md" mb={2} fontFamily="heading">
            Alterar senha
          </Heading>

          <Controller
            control={control}
            name="old_password"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder='Senha antiga'
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
            name="confirm_password"
            render={({ field: { onChange, value } }) => (

              <Input
                placeholder='Confirmar a Senha'
                secureTextEntry
                iconName="lock"
                onChangeText={onChange}
                value={value}
                onSubmitEditing={handleSubmit(handleProfileUpdate)}
                returnKeyType="send"
                errorMessage={errors.confirm_password?.message}
              />
            )}
          />

          <Button
            title="Atualizar"
            upperCase
            mt={4}
            onPress={handleSubmit(handleProfileUpdate)}
            isLoading={isUpdating}
          />
        </VStack>
      </ScrollView>
    </VStack>
  )
}