import { HeaderActionsUser } from "@components/HeaderActionsUser";
import { ProgressBar } from "@components/ProgressBar";
import { SelectInput } from "@components/SelectInput";
import { SectionList, Text, useTheme, VStack } from "native-base";

export function Consumo() {

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
      <HeaderActionsUser title="Meu consumo" subtitle="Veja onde está consumindo mais para poder reduzir!" />
      <SelectInput />
      <ProgressBar percentage={30} title="Consumo total na sua residência:" />

    </VStack >
  )
}