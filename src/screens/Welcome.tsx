import { useEffect, useState } from "react";
import { Box, Center, ScrollView, Text, VStack } from "native-base";

import { useNavigation } from "@react-navigation/native";

import ClipBoardText from '@assets/clipboard-text.png'
import LogoSvg from '@assets/logo.svg'

import { HeaderWelcome } from "@components/HeaderWelcome";
import { Points } from "@components/Points";
import { Button } from "@components/Button";
import { AppNavigatorStackRoutesProps } from "@routes/app.routes";

export function Welcome() {

  const [step, setStep] = useState(1);
  const navigation = useNavigation<AppNavigatorStackRoutesProps>()

  const StepOne = () => (
    <Center flex={1} px={8}>
      <HeaderWelcome title="Olá Guilherme," />
      <HeaderWelcome title="Seja bem vindo!" />

      <LogoSvg height={200} width={200} />

      <Points />
      <Points />
      <Points />
      <Points />

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

      <Box flex={1} mt={8} >
        <Text
          lineHeight={40}
          color="green.100"
          fontFamily="semibold"
          fontSize="md"

        >
          Precisamos realizar um breve questionário sobre você.{'\n'}
          Não se preocupe!{'\n'}
          São poucas questões para responder.{'\n'}
          Isso nos ajudará a conhecermos melhor você!
        </Text>
      </Box>

      <Text textAlign="center" fontSize="md" color="white">Ao usar o nosso aplicativo, você concorda com os termos de uso.</Text>
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