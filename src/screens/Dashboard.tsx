import { Box, Center, HStack, Icon, IconButton, Image, ScrollView, Text, VStack } from "native-base";
import { CircularProgressBar } from '@components/CircularProgress';
import Refrigerator from '@assets/geladeira.png'
import { MaterialIcons } from '@expo/vector-icons'
import LogoSVG from '@assets/logo.svg'
import { useToast } from 'native-base';
import { TouchableOpacity } from "react-native";

export function Dashboard() {

  const toast = useToast()

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
      flex={1} mt={12} px={8}
    >
      <VStack flex={1}>

        <HStack mt={4} mb={4} alignItems="center" justifyContent="space-between">
          <TouchableOpacity>
            <Image alt="profile" w={12} h={12} rounded="full" source={{ uri: 'https://github.com/guifuentes8.png' }} />
          </TouchableOpacity>
          <Text mt={2} color="green.100" fontSize="md" fontFamily="audiowide">
            Guilherme Fuentes
          </Text>
          <LogoSVG height={48} width={48} />
        </HStack>

        <VStack flex={1} justifyContent="flex-start" alignItems="center">
          <Center>
            <Text color="green.100" mb={3} textAlign="center" fontSize="xl" fontFamily="audiowide">Dashboard</Text>
            <CircularProgressBar
              radius={125}
              maxValue={100}
              circularProgressValue={30}
              strokeSize={9} />
            <Box mt={2} alignItems="center" h={4} w={4} justifyContent="center" >
              <IconButton
                onPress={() => toast.show({
                  maxWidth: 300,
                  title: 'Gasto esperado',
                  description: 'Comparação ao consumo médio da energia residencial na região sudeste (172,9 kWh/mês).',
                  placement: 'top',
                  bgColor: "blue.600"
                })}
                size={4} h={8} w={8} _pressed={{ bgColor: 'transparent' }} _icon={{ as: MaterialIcons, name: 'info-outline', color: 'green.100', size: 5 }} />
            </Box>
          </Center>

          <HStack mt={4} justifyContent="space-between">

            <Center w={40}>
              <Text mb={2} color="green.100" fontSize="lg" textAlign="center" fontFamily="semibold">Item que mais consome</Text>
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

              <Box mt={2} alignItems="center" h={4} w={4} justifyContent="center" >
                <IconButton
                  onPress={() => toast.show({
                    maxWidth: 300,
                    title: 'Maior consumo',
                    description: 'Este é o item que mais consome energia em sua residência.',
                    placement: 'top',
                    bgColor: "blue.600"
                  })}
                  size={1} h={4} w={4} _pressed={{ bgColor: 'transparent' }} _icon={{ as: MaterialIcons, name: 'info-outline', color: 'green.100', size: 5 }} />
              </Box>
            </Center>


            <Center w={40}>
              {/* <Text fontSize="xs" textAlign="center" fontFamily="regular" color="gray.400">Mês anterior: R$ 400,00</Text> */}

              <Text mb={2} color="green.100" fontSize="lg" textAlign="center" fontFamily="semibold">Gasto esperado do mês</Text>

              <CircularProgressBar
                radius={70}
                maxValue={189}
                value={180}
                strokeSize={5}
              >

                R$ 180,00

              </CircularProgressBar>

              <Box mt={2} alignItems="center" h={4} w={4} justifyContent="center" >
                <IconButton
                  onPress={() => toast.show({
                    maxWidth: 300,
                    title: 'Gasto esperado',
                    description: 'Comparação ao custo médio da energia residencial na região sudeste (R$ 188,46).',
                    placement: 'top',
                    bgColor: "blue.600"
                  })}
                  size={16}
                  _pressed={{ bgColor: 'transparent' }}
                  _icon={{ as: MaterialIcons, name: 'info-outline', color: 'green.100', size: 5 }}
                />
              </Box>
            </Center>

          </HStack>
        </VStack>
      </VStack >
    </ScrollView >

  )
}

