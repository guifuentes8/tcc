import { Box, Center, HStack, IconButton, Image, ScrollView, Text, VStack } from "native-base";
import { CircularProgressBar } from '@components/CircularProgress';
import Refrigerator from '@assets/geladeira.png'
import { MaterialIcons } from '@expo/vector-icons'

import { useToast } from 'native-base';
import { TouchableOpacity } from "react-native";

export function Dashboard() {

  const toast = useToast()

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
      flex={1} mt={12} px={8} pb={12}
    >
      <VStack >


        <TouchableOpacity>
          <Center>
            <VStack mt={4} mb={4} alignItems="center">
              <Image alt="profile" w={12} h={12} rounded="full" source={{ uri: 'https://github.com/guifuentes8.png' }} />
              <Text mt={2} color="green.100" fontSize="md" fontFamily="audiowide">
                Guilherme Fuentes
              </Text>
            </VStack>
          </Center>
        </TouchableOpacity>

        <VStack flex={1} justifyContent="flex-start" alignItems="center">
          <Center>
            <Text color="green.100" mb={3} fontSize="xl" fontFamily="audiowide">Consumo total</Text>
            <CircularProgressBar
              radius={125}
              maxValue={100}
              value={100}
              circularProgressValue={30}
              strokeSize={9} />
          </Center>

          <HStack mt={4} justifyContent="space-between">

            <Center w={40}>
              <Text mb={2} color="green.100" fontSize="md" textAlign="center" fontFamily="semibold">Maior consumo</Text>
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
                  size={1} h={4} w={4} _pressed={{ bgColor: 'transparent' }} _icon={{ as: MaterialIcons, name: 'help', color: 'green.100' }} />
              </Box>
              <Text mb={4} fontSize="xs" textAlign="center" fontFamily="regular" color="gray.400">A % é comparada com o total da residência.</Text>
            </Center>


            <Center w={40}>
              <Text mb={2} color="green.100" fontSize="md" textAlign="center" fontFamily="semibold">Gasto esperado</Text>
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
                    description: 'Gráfico em relação ao preço médio da região sudeste de R$ 188,46.',
                    placement: 'top',
                    bgColor: "blue.600"
                  })}
                  size={1} h={4} w={4} _pressed={{ bgColor: 'transparent' }} _icon={{ as: MaterialIcons, name: 'help', color: 'green.100' }} />
              </Box>
              <Text mb={4} fontSize="xs" textAlign="center" fontFamily="regular" color="gray.400">Mês anterior:{'\n'}R$ 400,00</Text>
            </Center>

          </HStack>
        </VStack>
      </VStack >
    </ScrollView>

  )
}

