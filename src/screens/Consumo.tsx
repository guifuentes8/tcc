import { HeaderActionsUser } from "@components/HeaderActionsUser";
import { ItemCard } from "@components/ItemCard";
import { Loading } from "@components/Loading";
import { ProgressBar } from "@components/ProgressBar";
import { SelectInput } from "@components/SelectInput";
import { useAuth } from "@hooks/useAuth";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { AppNavigatorTabRoutesProps } from "@routes/app.routes";
import { api } from "@services/api";
import { FlatList, ScrollView, SectionList, Text, useTheme, VStack } from "native-base";


import { useCallback, useEffect, useRef, useState } from "react";


export function Consumo({ route }: any) {

  const navigation = useNavigation<AppNavigatorTabRoutesProps>()
  const [isLoading, setIsLoading] = useState(false);
  const [dataSelect, setDataSelect] = useState<any>([]);
  const [dataItem, setDataItem] = useState<any>([]);
  const [totalValue, setTotalValue] = useState<any>({});
  const [service, setService] = useState<any>(1);
  const { user } = useAuth()

  const ref = useRef<any>(null)
  const scrollRef = useRef<any>(null)


  async function getCategoryData() {
    try {
      setIsLoading(true)

      const { data } = await api.get(`/category/all`)
      setDataSelect(data)

    } catch (error) {

    } finally {
      setIsLoading(false)
    }
  }

  async function getItemByCategoryData() {
    try {
      setIsLoading(true)

      const response = await api.get(`/items/dashboard/${user.id}`)
      setTotalValue({
        totalHours: response.data.totalHours,
        totalKwh: response.data.total
      })
      const { data } = await api.get(`/category/itemByCategory/${service}/${user.id}`)

      setDataItem(data)

    } catch (error) {

    } finally {
      setIsLoading(false)

    }
  }

  function handleChangeSelectValue(value: string) {
    setService(value)
  }

  function handleNavigateToDetails(itemData: any) {
    navigation.navigate('consumoDetail', { itemData })
  }

  useEffect(() => {
    getCategoryData()
  }, [])

  useEffect(() => {
    getItemByCategoryData()
  }, [service, route])

  useFocusEffect(
    useCallback(
      () => {
        ref?.current?.scrollToOffset({ offset: 0, animated: true });
        scrollRef?.current?.scrollTo({ offset: 0, animated: true });
        getItemByCategoryData()
      },
      [service],
    ))


  return (
    <VStack mt={16} flex={1} px={8}>
      {isLoading ? <Loading /> :
        <>
          <HeaderActionsUser title="Meu consumo" subtitle="Veja onde est?? consumindo mais para poder reduzir!" />
          <SelectInput
            selectedValue={service}
            onValueChange={(value) => {
              handleChangeSelectValue(value)
              getItemByCategoryData()
            }
            }
            data={dataSelect}
          />
          <ScrollView ref={scrollRef} showsVerticalScrollIndicator={false}>
            <ProgressBar
              textInsideProgressBar={`${Math.round(dataItem.totalItensKwhByCategory * 100 / totalValue.totalKwh)}%`}
              percentage={totalValue.totalKwh === 0 ? 0 : dataItem.totalItensKwhByCategory * 100 / totalValue.totalKwh}
              title="Consumo total na sua resid??ncia:"
            />
            <ProgressBar
              textInsideProgressBar={`${Math.round(dataItem.totalItemHoursByCategory * 100 / totalValue.totalHours)}%`}
              percentage={totalValue.totalHours === 0 ? 0 : dataItem.totalItemHoursByCategory * 100 / totalValue.totalHours}
              title="Tempo total de uso na sua resid??ncia:"
            />
            <ProgressBar
              textInsideProgressBar={`${dataItem.itemMoreConsumedPercentage}%`}
              percentage={dataItem.itemMoreConsumedPercentage}
              title={`Item que mais consome: ${dataItem.itemMoreConsumedName || 'Nenhum'}`}
            />

            <Text
              fontFamily="semibold"
              fontSize="md"
              color="green.100"
            >
              Itens em uso nesse ambiente:
            </Text>

            <FlatList
              horizontal
              ref={ref}
              showsHorizontalScrollIndicator={false}
              mb={8}
              data={dataItem.allItensDataByCategory}
              keyExtractor={(item, index): any => index}
              renderItem={({ item }: any) => (
                <ItemCard onPress={() => handleNavigateToDetails(
                  {
                    itemId: item.id,
                    categoryId: item.category_id,
                    categoryName: dataSelect.filter((item: any) => item?.id === service)[0].name,
                    totalCategoryHours: dataItem.totalItemHoursByCategory,
                    totalCategoryKwh: dataItem.totalItensKwhByCategory,
                    totalCategoryPrice: dataItem.totalItensPrice

                  }
                )} image={item?.photo} />
              )}
            />

          </ScrollView>
        </>
      }

    </VStack>

  )
}