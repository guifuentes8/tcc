import { useEffect, useState } from "react";
import { Box, Center, ScrollView, Text, VStack } from "native-base";

import { useNavigation } from "@react-navigation/native";

import ClipBoardText from '@assets/clipboard-text.png'
import LogoSvg from '@assets/logo.svg'

import { HeaderWelcome } from "@components/HeaderWelcome";
import { Points } from "@components/Points";
import { Button } from "@components/Button";
import { AppNavigatorStackRoutesProps } from "@routes/app.routes";
import { useAuth } from "@hooks/useAuth";

export function Welcome() {

  const [step, setStep] = useState(1);
  const { user } = useAuth();
  const navigation = useNavigation<AppNavigatorStackRoutesProps>()

  const StepOne = () => (
    <Center flex={1} px={8}>
      <HeaderWelcome title={`Olá ${user.name}`} />
      <HeaderWelcome title="Seja bem vindo!" />

      <LogoSvg height={200} width={200} />

      <VStack justifyContent="center" flex={1} >
        <Points />
        <Points />
        <Points />
        <Points />
      </VStack>



      <Button my={8} title="Continuar" onPress={() => setStep(2)} />
      <HeaderWelcome title="1/2" />
    </Center>
  );

  const StepTwo = () => (
    <Center flex={1} px={8} >
      <HeaderWelcome
        title="Questionário"
        image
        alt="Imagem de questionário"
        source={ClipBoardText} />

      <VStack flex={1} mt={8} justifyContent="center" >
        <Text
          lineHeight={40}
          color="green.100"
          fontFamily="medium"
          fontSize="lg"

        >
          Precisamos realizar um breve questionário sobre você...{'\n'} {'\n'}
          Não se preocupe!{'\n'}
          São poucas questões para responder!{'\n'} {'\n'}
          Isso nos ajudará a conhecermos melhor você!
        </Text>
      </VStack>

      <Text textAlign="center" mt={4} fontFamily="regular" fontSize="sm" color="white">Ao usar o nosso aplicativo, você concorda com os nossos termos de uso.</Text>
      <Button mt={3} mb={4} title="Vamos lá" onPress={() => setStep(3)} />
      <HeaderWelcome title="2/2" />
    </Center>
  );

  useEffect(() => {
    if (step === 3)
      navigation.navigate('questionary')
  }, [step])

  return (
    <VStack flex={1} mt={12}>
      {step === 1 && <StepOne />}
      {step === 2 && <StepTwo />}
    </VStack>
  )
}