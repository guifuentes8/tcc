import { HeaderActionsUser } from "@components/HeaderActionsUser";
import { Loading } from "@components/Loading";
import { ProgressBar } from "@components/ProgressBar";
import { SelectInput } from "@components/SelectInput";
import { useFocusEffect } from "@react-navigation/native";
import { api } from "@services/api";
import { SectionList, Text, useTheme, VStack } from "native-base";
import { useCallback, useEffect, useRef, useState } from "react";

export function Ranking({ route }: any) {

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
  const [isPercentage, setIsPercentage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [dataItem, setDataItem] = useState<any>([]);
  const [service, setService] = useState<string>("1");

  const ref = useRef<any>(null)

  function economized(data: any) {
    setIsPercentage(true)
    let arrFinal: { title: string; data: {}; }[] = []
    const economized = data.filter((user: any) => user.economized === true).sort((a: any, b: any) => {

      if (100 - (a.valorEsperado * 100) / a.valorUltimaConta <= 100 - (b.valorEsperado * 100) / b.valorUltimaConta) {
        return 1
      } else {
        return -1
      }
    })
    economized.map((element: any, index: any) => {
      if (index < 10) {
        element.percentage = 0
        let arrayAux = []
        arrayAux.push({
          id: index + 1,
          value: [(element.percentage = 100 - (element.valorEsperado * 100) / element.valorUltimaConta).toFixed(2), '%'],
          userName: element.nome,
        })
        arrFinal.push({
          title: `${index + 1}º lugar`,
          data: arrayAux
        })
      }
    });
    setDataItem(arrFinal)
  }

  function moreConsumed(data: any) {
    setIsPercentage(false)
    let arrFinal: { title: string; data: {}; }[] = []
    const consumed = data.sort((a: any, b: any) => {

      if (a.totalKwh <= b.totalKwh) {
        return 1
      } else {
        return -1
      }
    })
    consumed.map((element: any, index: any) => {
      if (index < 10) {

        element.percentage = 0
        let arrayAux = []
        arrayAux.push({
          id: index + 1,
          value: [element.totalKwh, 'Kwh'],
          userName: element.nome,
        })
        arrFinal.push({
          title: `${index + 1}º lugar`,
          data: arrayAux
        })
      }
    });
    setDataItem(arrFinal)
  }
  function minusConsumed(data: any) {
    setIsPercentage(false)
    let arrFinal: { title: string; data: {}; }[] = []
    const consumed = data.sort((a: any, b: any) => {

      if (a.totalKwh >= b.totalKwh) {
        return 1
      } else {
        return -1
      }
    })
    consumed.map((element: any, index: any) => {
      if (index < 10) {

        element.percentage = 0
        let arrayAux = []
        arrayAux.push({
          id: index + 1,
          value: [element.totalKwh, 'Kwh'],
          userName: element.nome,
        })
        arrFinal.push({
          title: `${index + 1}º lugar`,
          data: arrayAux
        })
      }
    });
    setDataItem(arrFinal)
  }
  function morePrice(data: any) {
    setIsPercentage(false)
    let arrFinal: { title: string; data: {}; }[] = []
    const consumed = data.sort((a: any, b: any) => {

      if (a.valorEsperado <= b.valorEsperado) {
        return 1
      } else {
        return -1
      }
    })
    consumed.map((element: any, index: any) => {
      if (index < 10) {

        element.percentage = 0
        let arrayAux = []
        arrayAux.push({
          id: index + 1,
          value: [`R$ ${Math.round(element.valorEsperado)}`, ''],
          userName: element.nome,
        })
        arrFinal.push({
          title: `${index + 1}º lugar`,
          data: arrayAux
        })
      }
    });
    setDataItem(arrFinal)
  }
  function minusPrice(data: any) {
    setIsPercentage(false)
    let arrFinal: { title: string; data: {}; }[] = []
    const consumed = data.sort((a: any, b: any) => {

      if (a.valorEsperado >= b.valorEsperado) {
        return 1
      } else {
        return -1
      }
    })
    consumed.map((element: any, index: any) => {
      if (index < 10) {

        element.percentage = 0
        let arrayAux = []
        arrayAux.push({
          id: index + 1,
          value: [`R$ ${Math.round(element.valorEsperado)}`, ''],
          userName: element.nome,
        })
        arrFinal.push({
          title: `${index + 1}º lugar`,
          data: arrayAux
        })
      }
    });
    setDataItem(arrFinal)
  }
  function moreHours(data: any) {
    setIsPercentage(false)
    let arrFinal: { title: string; data: {}; }[] = []
    const consumed = data.sort((a: any, b: any) => {

      if (a.totalHours <= b.totalHours) {
        return 1
      } else {
        return -1
      }
    })
    consumed.map((element: any, index: any) => {
      if (index < 10) {

        element.percentage = 0
        let arrayAux = []
        arrayAux.push({
          id: index + 1,
          value: [`${Math.round(element.totalHours)}`, 'horas'],
          userName: element.nome,
        })
        arrFinal.push({
          title: `${index + 1}º lugar`,
          data: arrayAux
        })
      }
    });
    setDataItem(arrFinal)
  }

  function minusHours(data: any) {
    setIsPercentage(false)
    let arrFinal: { title: string; data: {}; }[] = []
    const consumed = data.sort((a: any, b: any) => {

      if (a.totalHours >= b.totalHours) {
        return 1
      } else {
        return -1
      }
    })
    consumed.map((element: any, index: any) => {
      if (index < 10) {

        element.percentage = 0
        let arrayAux = []
        arrayAux.push({
          id: index + 1,
          value: [`${Math.round(element.totalHours)}`, 'horas'],
          userName: element.nome,
        })
        arrFinal.push({
          title: `${index + 1}º lugar`,
          data: arrayAux
        })
      }
    });
    setDataItem(arrFinal)
  }
  async function getRanking() {
    try {
      setIsLoading(true)
      const { data } = await api.get(`/questions/ranking`)

      if (service === "1")
        economized(data)
      if (service === "2")
        moreConsumed(data)
      if (service === "3")
        minusConsumed(data)
      if (service === "4")
        morePrice(data)
      if (service === "5")
        minusPrice(data)
      if (service === "6")
        moreHours(data)
      if (service === "7")
        minusHours(data)



    } catch (error) {

    } finally {
      setIsLoading(false)

    }
  }

  useEffect(() => {
    getRanking()
  }, [service, route])

  useFocusEffect(
    useCallback(
      () => {
        getRanking()
      },
      [service, route],
    ))

  function handleChangeSelectValue(value: string) {
    setService(value)
  }

  return (
    <VStack mt={16} flex={1} px={8} >
      {isLoading ? <Loading /> :
        <>
          <HeaderActionsUser title="Ranking" subtitle="Este são os usuários que mais se destacaram nesse mês!" />
          <SelectInput
            selectedValue={service}
            onValueChange={(value) => handleChangeSelectValue(value)}
            data={dataSelect}
          />
          {dataItem && dataItem.length > 0 &&
            <SectionList
              ref={ref}
              showsVerticalScrollIndicator={false}
              w="100%"
              sections={dataItem}
              contentContainerStyle={{ justifyContent: 'center', paddingBottom: 32 }}
              keyExtractor={(item: any) => item.id}
              renderSectionHeader={({ section }: any) => <Text fontSize="xl" fontFamily="audiowide" color="green.100">{section.title}</Text>}
              renderItem={({ item }) => (
                <ProgressBar textInsideProgressBar={`${String(item.value[0])} ${item.value[1]}`} percentage={isPercentage ? item.value[0] : 100} title={`Morador: ${item.userName}`} />
              )}
            />
          }

        </>
      }
    </VStack >
  )
}