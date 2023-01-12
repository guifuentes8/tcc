import { CircularProgressBar } from "@components/CircularProgress";
import { HeaderActionsUser } from "@components/HeaderActionsUser";
import { ItemCard } from "@components/ItemCard";
import { ProgressBar } from "@components/ProgressBar";
import { SelectInput } from "@components/SelectInput";
import { Center, FlatList, HStack, Image, ScrollView, SectionList, Text, useTheme, VStack } from "native-base";

export function ConsumoDetail() {

  const { colors } = useTheme()

  const data = [
    {
      title: "1º lugar",
      data: [{ id: 1, percentage: 70 }]
    },
    {
      title: "2º lugar",
      data: [{ id: 2, percentage: 30 }]
    },
    {
      title: "2º lugar",
      data: [{ id: 2, percentage: 30 }]
    },
    {
      title: "2º lugar",
      data: [{ id: 2, percentage: 30 }]
    },
    {
      title: "2º lugar",
      data: [{ id: 2, percentage: 30 }]
    },
    {
      title: "2º lugar",
      data: [{ id: 2, percentage: 30 }]
    },

  ]
  return (
    <ScrollView mt={16} flex={1} px={8} showsVerticalScrollIndicator={false}>
      <VStack>
        <HeaderActionsUser title="Banheiro" subtitle="Veja os detalhes dos itens deste cômodo!" />
        <SelectInput />
        <Center mt={4}>
          <Image
            w={32}
            h={32}
            alt="Foto item"
            source={{ uri: 'https://github.com/guifuentes8.png' }}
          />
        </Center>

        <HStack justifyContent="space-between" mt={8} mb={2}>
          <VStack>
            <Text mb={2} color="green.100" fontSize="lg" textAlign="center" fontFamily="semibold">Horas</Text>
            <CircularProgressBar
              radius={50}
              maxValue={100}
              value={30}
              title="horas"
              strokeSize={5}
            >
              30h
            </CircularProgressBar>
          </VStack>
          <VStack>
            <Text mb={2} color="green.100" fontSize="lg" textAlign="center" fontFamily="semibold">Consumo</Text>
            <CircularProgressBar
              radius={50}
              maxValue={300}
              value={70}
              strokeSize={5}
            >
              70 kWh/mês
            </CircularProgressBar>
          </VStack>
          <VStack>
            <Text mb={2} color="green.100" fontSize="lg" textAlign="center" fontFamily="semibold">Custo</Text>
            <CircularProgressBar
              radius={50}
              value={30}
              maxValue={100}
              title=''
              strokeSize={5}
            >
              R$ 40,00
            </CircularProgressBar>
          </VStack>
        </HStack>
        <Text color="white" fontSize="sm" textAlign="center" fontFamily="medium">
          As % acima são comparadas com o total da residência
        </Text>

      </VStack>

    </ScrollView >
  )
}