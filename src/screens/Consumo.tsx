import { HeaderActionsUser } from "@components/HeaderActionsUser";
import { ItemCard } from "@components/ItemCard";
import { ProgressBar } from "@components/ProgressBar";
import { SelectInput } from "@components/SelectInput";
import { FlatList, ScrollView, SectionList, Text, useTheme, VStack } from "native-base";

export function Consumo() {

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
        <HeaderActionsUser title="Meu consumo" subtitle="Veja onde está consumindo mais para poder reduzir!" />
        <SelectInput />
        <ProgressBar textInsideProgressBar="30%" percentage={30} title="Consumo total na sua residência:" />
        <ProgressBar textInsideProgressBar="30%" percentage={30} title="Tempo total de uso na sua residência:" />
        <ProgressBar textInsideProgressBar="30%" percentage={30} title="Item que mais consome: chuveiro elétrico" />

        <Text
          fontFamily="semibold"
          fontSize="md"
          color="green.100"
        >
          Itens em uso nesse ambiente:
        </Text>

        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={data}
          keyExtractor={(item, index): any => index}
          renderItem={({ item }) => (
            <ItemCard itemName="Geladeira" />
          )}
        />

      </VStack>

    </ScrollView>
  )
}