import { HeaderActionsUser } from "@components/HeaderActionsUser";
import { ProgressBar } from "@components/ProgressBar";
import { SelectInput } from "@components/SelectInput";
import { SectionList, Text, useTheme, VStack } from "native-base";
import { useState } from "react";

export function Ranking() {


  const data = [
    {
      title: "1º lugar",
      data: [{ id: 1, percentage: 70, userName: 'Gui' }]
    },
    {
      title: "2º lugar",
      data: [{ id: 1, percentage: 30, userName: 'Gui Fuentes' }]
    },
    {
      title: "3º lugar",
      data: [{ id: 1, percentage: 15, userName: 'Guilherme' }]
    },
  ]

  const dataSelect = [
    {
      id: "1",
      name: 'Mais econômicos',
    },
    {
      id: "2",
      name: 'Mais consomem',
    },
    {
      id: "3",
      name: 'Menos consomem',
    },
    {
      id: "4",
      name: 'Maior valor de conta',
    },
    {
      id: "5",
      name: 'Menor valor de conta',
    },
    {
      id: "6",
      name: 'Maior tempo',
    },
    {
      id: "7",
      name: 'Menor tempo',
    },
  ]

  const [service, setService] = useState(dataSelect[0].id);

  function handleChangeSelectValue(value: string) {
    setService(value)
  }

  return (
    <VStack mt={16} flex={1} px={8} >
      <HeaderActionsUser title="Ranking" subtitle="Este são os usuários que mais se destacaram nesse mês!" />
      <SelectInput
        selectedValue={service}
        onValueChange={(value) => handleChangeSelectValue(value)}
        data={dataSelect}
      />
      <SectionList
        showsVerticalScrollIndicator={false}
        w="100%"
        sections={data}
        contentContainerStyle={{ justifyContent: 'center', paddingBottom: 32 }}
        keyExtractor={(item: any) => item.id}
        renderSectionHeader={({ section }) => <Text fontSize="xl" fontFamily="audiowide" color="green.100">{section.title}</Text>}
        renderItem={({ item }) => (
          <ProgressBar textInsideProgressBar={`${item.percentage}%`} percentage={item.percentage} title={`Morador: ${item.userName}`} />
        )}
      />

    </VStack >
  )
}