import { CircularProgressBar } from "@components/CircularProgress";
import { HeaderActionsUser } from "@components/HeaderActionsUser";
import Refrigerator from "@assets/geladeira.png";

import { SelectInput } from "@components/SelectInput";
import { Center, HStack, Image, ScrollView, Text, VStack } from "native-base";
import { useCallback, useEffect, useState } from "react";
import { MaskedText } from "react-native-mask-text";
import { api } from "@services/api";
import { useFocusEffect } from "@react-navigation/native";
import { Loading } from "@components/Loading";

export function ConsumoDetail({ route }: any) {

  const { itemData } = route.params
  const [isLoading, setIsLoading] = useState(false);
  const [dataSelect, setDataSelect] = useState([]);
  const [service, setService] = useState<any>(null);


  async function getCategoryData() {
    try {
      setIsLoading(true)
      const { data } = await api.get(`/items/allItemByCategory/${itemData.categoryId}`)
      setService(itemData.itemId)
      setDataSelect(data)

    } catch (error) {

    } finally {
      setIsLoading(false)
    }
  }




  const dataItem = {
    itemImage: Refrigerator,
    itemHours: 40,
    itemConsumo: 90,
    itemGasto: 40,
    maxHoursCategoria: 120,
    maxConsumoCategoria: 220,
    maxGastoCategoria: 400,

  }

  async function getItemData() {
    try {
      setIsLoading(true)
      const { data } = await api.get(`/items/itemById/${service}`)
      console.log(data)
    } catch (error) {

    } finally {
      setIsLoading(false)

    }
  }

  function handleChangeSelectValue(value: string) {
    setService(value)
  }

  useFocusEffect(
    useCallback(
      () => {
        getCategoryData()
      },
      [route],
    ))

  useEffect(() => {
    getItemData()
  }, [service])


  return (

    <VStack mt={16} flex={1} px={8}>
      {isLoading ? <Loading /> :

        <>
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
        </>
      }

    </VStack>

  )
}