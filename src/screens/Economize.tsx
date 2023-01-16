import { EconomizeCard } from "@components/EconomizeCard";
import { HeaderActionsUser } from "@components/HeaderActionsUser";
import { Loading } from "@components/Loading";
import { useAuth } from "@hooks/useAuth";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorStackRoutesProps } from "@routes/app.routes";
import { api } from "@services/api";
import { SectionList, Text, VStack, Box } from "native-base";
import { useEffect, useState } from "react";

export function Economize() {

  const navigation = useNavigation<AppNavigatorStackRoutesProps>()
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<any[]>([]);
  const { user } = useAuth()



  async function getData() {
    try {
      setIsLoading(true)

      const { data } = await api.get('/category')
      const response = await api.get(`/items/dashboard/${user.id}`)

      const percentageArr = response.data.itens.map((element: any) => {
        return {
          itemId: element.itemId,
          percentageItem: element.percentage
        }
      })

      const primaryArray = data.map((sectionList: any) => {

        const secondaryArray = sectionList.data.filter((itemData: any) => {
          percentageArr.forEach((element: any) => {
            if (element.itemId === itemData.id) {
              itemData.percentage = element.percentageItem;
            }
          });
          return itemData
        })


        return { title: sectionList.title, data: secondaryArray }
      })

      setData(primaryArray)

    } catch (error) {

    } finally {
      setIsLoading(false)
    }
  }


  function handleGoToQuestionaryEdit() {
    navigation.navigate('questionaryItemEdit')
  }


  useEffect(() => {
    getData()
  }, [])

  return (
    <>
      {isLoading && <Loading />}
      {!isLoading && <VStack mt={16} flex={1} px={8}>
        <HeaderActionsUser title="Economize energia!" subtitle="Clique nos itens abaixo para alterar o seu consumo!" />
        <SectionList
          showsVerticalScrollIndicator={false}
          w="100%"
          sections={data}
          contentContainerStyle={{ justifyContent: 'center', paddingBottom: 64 }}
          keyExtractor={(item: any, index) => item.id}
          renderSectionHeader={({ section: { title } }) => <Text fontSize="xl" fontFamily="audiowide" color="green.100">{title}</Text>}
          renderItem={({ item }: any) => (
            <EconomizeCard card image={item.photo} itemPercentage={item.percentage || 0} itemName={item.name} onPress={handleGoToQuestionaryEdit} />
          )}
        />
      </VStack >
      }
    </>
  )
}