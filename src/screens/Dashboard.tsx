import { Center, HStack, ScrollView, Text, VStack } from "native-base";
import { CircularProgressBar } from '@components/CircularProgress';
import Refrigerator from '@assets/geladeira.png'
import { useToast } from 'native-base';
import { HeaderActionsUser } from "@components/HeaderActionsUser";
import { TouchableOpacity } from "react-native";

export function Dashboard() {

  const toast = useToast();
  const economized = false;

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
      mt={12} px={8}
    >
      <VStack flex={1}>
        <HeaderActionsUser title="Dashboard" subtitle="" profile />
        <VStack flex={1} justifyContent="flex-start" alignItems="center">
          <Center>
            <Text color="green.100" my={4} textAlign="center" fontSize="xl" fontFamily="audiowide">Dashboard</Text>
            <TouchableOpacity
              onPress={() => toast.show({
                maxWidth: 300,
                minWidth: 300,
                title: 'Gasto esperado',
                description: 'Comparação ao consumo médio da energia residencial na região sudeste (172,9 kWh/mês).',
                placement: 'top',
                bgColor: "blue.600"
              })}
            >
              <CircularProgressBar
                radius={125}
                maxValue={100}
                circularProgressValue={30}
                strokeSize={9} />

            </TouchableOpacity>
          </Center>

          <HStack mt={4} justifyContent="space-between">
            <Center w={40}>
              <Text mb={2} color="green.100" fontSize="lg" textAlign="center" fontFamily="semibold">Item que mais consome</Text>
              <TouchableOpacity
                onPress={() => toast.show({
                  maxWidth: 300,
                  minWidth: 300,
                  title: 'Maior consumo',
                  description: 'Este é o item que mais consome energia em sua residência. Atualmente 30%.',
                  placement: 'top',
                  bgColor: "blue.600"
                })}
              >
                <CircularProgressBar
                  radius={70}
                  maxValue={100}
                  value={30}
                  sourceImg={Refrigerator}
                  strokeSize={5}
                >
                  <Text fontSize="12px">Geladeira</Text>
                  {'\n'}
                  30%
                </CircularProgressBar>
              </TouchableOpacity>

            </Center>


            <Center w={40}>
              <Text mb={2} color="green.100" fontSize="lg" textAlign="center" fontFamily="semibold">Gasto esperado do mês</Text>
              <TouchableOpacity
                onPress={() => toast.show({
                  maxWidth: 300,
                  minWidth: 300,
                  title: 'Gasto esperado',
                  description: `Este valor é comparado ao valor da sua última conta de luz (400 reais). ${'\n'}${economized ? 'Parabéns, você está economizando!' : 'Ops, seria melhor você economizar um pouco!'}`,
                  placement: 'top',
                  bgColor: "blue.600"
                })}
              >
                <CircularProgressBar
                  radius={70}
                  maxValue={400}
                  value={180}
                  strokeSize={5}
                >
                  R$ 180,00
                </CircularProgressBar>
              </TouchableOpacity>
            </Center>

          </HStack>
        </VStack>
      </VStack >
    </ScrollView >

  )
}

