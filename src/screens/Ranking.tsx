import { HeaderActionsUser } from "@components/HeaderActionsUser";
import { ProgressBar } from "@components/ProgressBar";
import { SectionList, Text, useTheme, VStack } from "native-base";

export function Ranking() {

  const { colors } = useTheme()

  const data = [
    {
      title: "1º lugar - 70%",
      data: [{ id: 1, percentage: 70 }]
    },
    {
      title: "2º lugar - 30%",
      data: [{ id: 2, percentage: 30 }]
    },
    {
      title: "2º lugar - 30%",
      data: [{ id: 2, percentage: 30 }]
    },
    {
      title: "2º lugar - 30%",
      data: [{ id: 2, percentage: 30 }]
    },
    {
      title: "2º lugar - 30%",
      data: [{ id: 2, percentage: 30 }]
    },
    {
      title: "2º lugar - 30%",
      data: [{ id: 2, percentage: 30 }]
    },

  ]
  return (
    <VStack mt={16} flex={1} px={8} >
      <HeaderActionsUser title="Ranking de consumo!" subtitle="Este são os usuários que mais se destacaram no mês!" />
      <SectionList
        showsVerticalScrollIndicator={false}
        w="100%"
        sections={data}
        contentContainerStyle={{ justifyContent: 'center', paddingBottom: 64 }}
        keyExtractor={(item: any) => item.id}
        renderSectionHeader={({ section }) => <Text fontSize="xl" fontFamily="medium" color="green.100">{section.title}</Text>}
        renderItem={({ item }) => (
          <ProgressBar percentage={item.percentage} nameUser="Guilherme Fuentes" />
        )}
      />

    </VStack >
  )
}