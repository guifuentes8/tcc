import { Center, HStack, ScrollView, Text, VStack } from "native-base";
import { CircularProgressBar } from '@components/CircularProgress';
import { useToast } from 'native-base';
import { HeaderActionsUser } from "@components/HeaderActionsUser";
import { TouchableOpacity } from "react-native";
import { MaskedText } from "react-native-mask-text";
import { useCallback, useState } from "react";
import { api } from "@services/api";
import { useAuth } from "@hooks/useAuth";
import { Loading } from "@components/Loading";
import { useFocusEffect } from "@react-navigation/native";

type dataDashboardProps = {
  total: number;
  comparePercentage: number;
  itemPhoto: string;
  itemName: string;
  itemPercentageOfTotal: number;
  economized: boolean;
  valorEsperado: number;
  valorUltimaConta: number;
  isLight: boolean;
}

export function Dashboard() {

  const [isLoading, setIsLoading] = useState(false);
  const [dataDashboard, setDataDashboard] = useState({} as dataDashboardProps);
  const { user, refreshedToken } = useAuth()

  const toast = useToast();

  async function getDashboard() {
    try {
      setIsLoading(true)

      const { data } = await api.get(`/items/dashboard/${user.id}`)
      setDataDashboard(data)

    } catch (error) {

    } finally {
      setIsLoading(false)
    }
  }

  useFocusEffect(
    useCallback(
      () => {
        getDashboard()
      },
      [refreshedToken],
    ))


  return (
    <>
      {isLoading && <Loading />}
      {!isLoading &&
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
          mt={12} px={8}
        >
          <VStack flex={1}>
            <HeaderActionsUser title="Dashboard" subtitle="" profile />
            <VStack flex={1} justifyContent="flex-start" alignItems="center">
              <Center>
                <Text color="green.100" my={4} textAlign="center" fontSize="xl" fontFamily="audiowide">Dashboard</Text>
                <TouchableOpacity
                  onPress={() => toast.show({
                    maxWidth: 300,
                    minWidth: 300,
                    title: 'Gasto esperado',
                    description: `Essa quantia est?? sendo comparada com o valor da sua ??ltima conta.  (Aproximadamente ${dataDashboard?.comparePercentage} kWh/m??s)`,
                    placement: 'top',
                    bgColor: "blue.600"
                  })}
                >
                  <CircularProgressBar
                    radius={125}
                    maxValue={dataDashboard?.comparePercentage < dataDashboard.total ? dataDashboard.total : dataDashboard.comparePercentage}
                    circularProgressValue={dataDashboard?.total}
                    strokeSize={9} />

                </TouchableOpacity>
              </Center>

              <HStack mt={4} justifyContent="space-between">
                <Center w={40}>
                  <Text mb={2} color="green.100" fontSize="lg" textAlign="center" fontFamily="semibold">Item que mais consome</Text>
                  <TouchableOpacity
                    onPress={() => toast.show({
                      maxWidth: 300,
                      minWidth: 300,
                      title: 'Maior consumo',
                      description: `Este ?? o item que mais consome energia em sua resid??ncia. Atualmente ${dataDashboard.itemPercentageOfTotal}%.`,
                      placement: 'top',
                      bgColor: "blue.600"
                    })}
                  >
                    <CircularProgressBar
                      isCircularProgress={false}
                      radius={70}
                      maxValue={100}
                      value={dataDashboard.isLight ? 100 : dataDashboard.itemPercentageOfTotal}
                      sourceImg={{ uri: dataDashboard.isLight ? `${api.defaults.baseURL}/items/thumb/lampada.png` : `${api.defaults.baseURL}/items/thumb/${dataDashboard.itemPhoto}` }}
                      strokeSize={5}
                    >
                      <Text numberOfLines={1} fontSize="10px">{dataDashboard.isLight ? 'L??mpadas' : dataDashboard.itemName}</Text>
                      {'\n'}
                      {dataDashboard.isLight ? '100' : dataDashboard.itemPercentageOfTotal}%
                    </CircularProgressBar>
                  </TouchableOpacity>

                </Center>


                <Center w={40}>
                  <Text mb={2} color="green.100" fontSize="lg" textAlign="center" fontFamily="semibold">Gasto esperado do m??s</Text>
                  <TouchableOpacity
                    onPress={() => toast.show({
                      maxWidth: 300,
                      minWidth: 300,
                      title: 'Gasto esperado',
                      description: `Este valor ?? comparado ao valor da sua ??ltima conta de luz (R$ ${dataDashboard.valorUltimaConta}). ${'\n'}${dataDashboard.economized ? 'Parab??ns, voc?? est?? economizando!' : 'Ops, seria melhor voc?? economizar um pouco!'}`,
                      placement: 'top',
                      bgColor: "blue.600"
                    })}
                  >
                    <CircularProgressBar
                      isCircularProgress={false}
                      radius={70}
                      maxValue={dataDashboard.valorUltimaConta < dataDashboard.valorEsperado ? dataDashboard.valorEsperado : dataDashboard.valorUltimaConta}
                      value={dataDashboard.valorEsperado}
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
                        {String(dataDashboard.valorEsperado * 100)}
                      </MaskedText>
                    </CircularProgressBar>
                  </TouchableOpacity>
                </Center>
              </HStack>
            </VStack>
          </VStack >
        </ScrollView >
      }
    </>
  )
}

