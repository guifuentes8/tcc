import { CircularProgressBar } from "@components/CircularProgress";
import { HeaderActionsUser } from "@components/HeaderActionsUser";
import Refrigerator from "@assets/geladeira.png";

import { SelectInput } from "@components/SelectInput";
import { Center, FlatList, HStack, Image, ScrollView, SectionList, Text, useTheme, VStack } from "native-base";
import { useState } from "react";
import { MaskedText } from "react-native-mask-text";

export function ConsumoDetail() {

  const { colors } = useTheme()

  const dataItem = {
    itemImage: Refrigerator,
    itemHours: 40,
    itemConsumo: 90,
    itemGasto: 40,
    maxHoursCategoria: 120,
    maxConsumoCategoria: 220,
    maxGastoCategoria: 400,

  }

  const dataSelect = [
    {
      id: "1",
      name: 'Geladeira',
    },
    {
      id: "2",
      name: 'Banheiro',
    },
    {
      id: "3",
      name: 'Lavanderia',
    },
  ]

  const [service, setService] = useState(dataSelect[0].id);

  function handleChangeSelectValue(value: string) {
    setService(value)
  }


  return (
    <VStack mt={16} flex={1} px={8}>
      <HeaderActionsUser title="Banheiro" subtitle="Veja os detalhes dos itens deste cômodo!" />
      <SelectInput
        selectedValue={service}
        onValueChange={(value) => handleChangeSelectValue(value)}
        data={dataSelect}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Center mt={4}>
          <Image
            w={24}
            h={24}
            alt="Foto item"
            source={dataItem.itemImage}
          />
        </Center>

        <HStack justifyContent="space-between" mt={8} mb={2}>
          <VStack>
            <Text mb={2} color="green.100" fontSize="lg" textAlign="center" fontFamily="semibold">Horas</Text>
            <CircularProgressBar
              radius={50}
              maxValue={dataItem.maxHoursCategoria}
              value={dataItem.itemHours}
              title="horas"
              strokeSize={5}
            >
              {dataItem.itemHours}h
            </CircularProgressBar>
          </VStack>
          <VStack>
            <Text mb={2} color="green.100" fontSize="lg" textAlign="center" fontFamily="semibold">Consumo</Text>
            <CircularProgressBar
              radius={50}
              maxValue={dataItem.maxConsumoCategoria}
              value={dataItem.itemConsumo}
              strokeSize={5}
            >
              {dataItem.itemConsumo} kWh / mês
            </CircularProgressBar>
          </VStack>
          <VStack>
            <Text mb={2} color="green.100" fontSize="lg" textAlign="center" fontFamily="semibold">Custo</Text>
            <CircularProgressBar
              radius={50}
              value={dataItem.itemGasto}
              maxValue={dataItem.maxGastoCategoria}
              title=''
              strokeSize={5}
            >
              <MaskedText
                type="currency"
                options={{
                  prefix: 'R$ ',
                  decimalSeparator: ',',
                  groupSeparator: '.',
                  precision: 2
                }}
              >
                {String(dataItem.itemGasto * 100)}
              </MaskedText>
            </CircularProgressBar>
          </VStack>
        </HStack>
        <Text pb={4} color="green.100" fontSize="sm" textAlign="center" fontFamily="medium">
          As % acima são comparadas com o total da categoria do item.
        </Text>

      </ScrollView >
    </VStack>

  )
}