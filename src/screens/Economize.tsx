import { EconomizeCard } from "@components/EconomizeCard";
import { HeaderActionsUser } from "@components/HeaderActionsUser";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorStackRoutesProps } from "@routes/app.routes";
import { SectionList, Text, VStack, Box } from "native-base";

import Refrigerator from "@assets/geladeira.png";
import Cooktop from "@assets/cooktop.png";
import EletricOven from "@assets/forno-eletrico.png";
import Microwave from "@assets/microondas.png";
import WashingMachine from "@assets/maquina-lavar-roupa.png";
import ClothesDryer from "@assets/secadora-roupa.png";
import Shower from "@assets/chuveiro.png";
import HairDryer from "@assets/secador-cabelo.png";
import EletricFaucet from "@assets/torneira-eletrica.png";
import AirConditioner from "@assets/ar-condicionado.png";
import Fan from "@assets/ventilador.png";
import VacuumCleaner from "@assets/aspirador-po.png";
import EletricIron from "@assets/ferro-eletrico.png";
import Videogame from "@assets/videogame.png";
import Tv from "@assets/tv.png";
import Computer from "@assets/pc.png";


export function Economize() {

  const navigation = useNavigation<AppNavigatorStackRoutesProps>()

  const data = [
    {
      title: "Cozinha",
      data: [
        {
          itemId: 1,
          src: Refrigerator,
          itemName: "Geladeira",
          inputName: "refrigerator",
          percentage: 30,
        },
        {
          itemId: 1,
          src: Cooktop,
          itemName: "Cooktop",
          inputName: "eletric_stove",
          percentage: 30,
        },
        {
          itemId: 1,
          src: EletricOven,
          itemName: "Forno elétrico",
          inputName: "eletric_oven",
          percentage: 30,
        },
        {
          itemId: 1,
          src: Microwave,
          itemName: "Micro-ondas",
          inputName: "microwave",
          percentage: 30,
        },
      ],
    },

    {
      title: "Lavanderia",
      data: [
        {
          itemId: 1,
          src: WashingMachine,
          itemName: "Máquina de lavar roupa",
          inputName: "washing_machine",
          percentage: 30,
        },
        {
          itemId: 1,
          src: ClothesDryer,
          itemName: "Secadora de roupas",
          inputName: "clothes_dryer",
          percentage: 30,
        },
      ]

    },
    {
      title: "Banheiro",
      data: [
        {
          itemId: 1,
          src: Shower,
          itemName: "Chuveiro elétrico",
          inputName: "shower",
          percentage: 30,
        },
        {
          itemId: 1,
          src: HairDryer,
          itemName: "Secador de cabelo",
          inputName: "hair_dryer",
          percentage: 30,
        },
        {
          itemId: 1,
          src: EletricFaucet,
          itemName: "Torneira elétrica",
          inputName: "eletric_faucet",
          percentage: 30,
        },
      ]

    },
    {
      title: "Eletrodomésticos",
      data: [
        {
          itemId: 1,
          src: AirConditioner,
          itemName: "Ar-condicionado",
          inputName: "air_conditioner",
          percentage: 30,
        },
        {
          itemId: 1,
          src: Fan,
          itemName: "Ventilador",
          inputName: "fan",
          percentage: 30,
        },
        {
          itemId: 1,
          src: VacuumCleaner,
          itemName: "Aspirador de pó",
          inputName: "vacuum_cleaner",
          percentage: 30,
        },
        {
          itemId: 1,
          src: EletricIron,
          itemName: "Ferro elétrico",
          inputName: "eletric_iron",
          percentage: 30,
        },
      ]

    },
    {
      title: "Eletrônicos",
      data: [
        {
          src: Videogame,
          itemName: "Videogame",
          inputName: "videogame",
          percentage: 30,
        },
        {
          src: Tv,
          itemName: "Televisão",
          inputName: "tv",
          percentage: 30,
        },
        {
          src: Computer,
          itemName: "Computador",
          inputName: "computer",
          percentage: 40,
        },
      ]
    }
  ];


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
        keyExtractor={(item, index) => item.itemName}
        renderSectionHeader={({ section: { title } }) => <Text fontSize="xl" fontFamily="audiowide" color="green.100">{title}</Text>}
        renderItem={({ item }) => (
          <EconomizeCard image={item.src} itemPercentage={item.percentage} itemName={item.itemName} onPress={handleGoToQuestionaryEdit} />
        )}
      />
    </VStack >
  )
}