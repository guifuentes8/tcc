import { HeaderActionsUser } from "@components/HeaderActionsUser";
import { ItemCard } from "@components/ItemCard";
import { ProgressBar } from "@components/ProgressBar";
import { SelectInput } from "@components/SelectInput";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorTabRoutesProps } from "@routes/app.routes";
import { FlatList, ScrollView, SectionList, Text, useTheme, VStack } from "native-base";

export function Consumo() {

  const { colors } = useTheme()
  const navigation = useNavigation<AppNavigatorTabRoutesProps>()

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

  function handleNavigateToDetails() {
    navigation.navigate('consumoDetail')
  }

  return (
    <VStack mt={16} flex={1} px={8}>
      <HeaderActionsUser title="Meu consumo" subtitle="Veja onde está consumindo mais para poder reduzir!" />
      <SelectInput />
      <ScrollView showsVerticalScrollIndicator={false}>
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
          mb={8}
          data={data}
          keyExtractor={(item, index): any => index}
          renderItem={({ item }) => (
            <ItemCard onPress={handleNavigateToDetails} itemName="Geladeira" />
          )}
        />

      </ScrollView>
    </VStack>

  )
}