import { EconomizeCard } from "@components/EconomizeCard";
import { HeaderActionsUser } from "@components/HeaderActionsUser";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorTabRoutesProps } from "@routes/app.routes";
import { SectionList, Text, VStack, Box } from "native-base";


export function Economize() {

  const navigation = useNavigation<AppNavigatorTabRoutesProps>()

  const data = [
    {
      title: "Cozinha",
      data: ['oi', 'tchau']
    },
    {
      title: "Cozinha",
      data: ['oi']
    },
    {
      title: "Cozinha",
      data: ['oi']
    },
    {
      title: "Cozinha",
      data: ['oi']
    },
    {
      title: "Cozinha",
      data: ['oi']
    },
    {
      title: "Banheiro",
      data: ['oi']
    }
  ]

  function handleGoToQuestionaryEdit() {
    navigation.navigate('questionaryItemEdit')
  }

  return (
    <VStack mt={16} flex={1} px={8}>
      <HeaderActionsUser title="Economize energia!" subtitle="Clique nos itens abaixo para alterar o seu consumo!" />
      <SectionList
        showsVerticalScrollIndicator={false}
        w="100%"
        sections={data}
        contentContainerStyle={{ justifyContent: 'center', paddingBottom: 64 }}
        keyExtractor={(item, index) => item + index}
        renderSectionHeader={({ section: { title } }) => <Text fontSize="xl" fontFamily="audiowide" color="green.100">{title}</Text>}
        renderItem={({ item }) => (
          <EconomizeCard onPress={handleGoToQuestionaryEdit} />
        )}
      />
    </VStack >
  )
}