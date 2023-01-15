import { HeaderActionsUser } from "@components/HeaderActionsUser";
import { ItemCard } from "@components/ItemCard";
import { ProgressBar } from "@components/ProgressBar";
import { SelectInput } from "@components/SelectInput";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorTabRoutesProps } from "@routes/app.routes";
import { FlatList, ScrollView, SectionList, Text, useTheme, VStack } from "native-base";

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
import { useState } from "react";

export function Consumo() {

  const { colors } = useTheme()
  const navigation = useNavigation<AppNavigatorTabRoutesProps>()

  const dataSelect = [
    {
      id: "1",
      name: 'Cozinha',
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


  const data = [
    {
      categoryName: "Cozinha",
      src: Refrigerator,
      itemName: "Geladeira",
      inputName: "refrigerator",
      maxRangeInput: 5,
    },
    {
      categoryName: "Cozinha",
      src: Cooktop,
      itemName: "Cooktop",
      inputName: "eletric_stove",
      maxRangeInput: 5,
    },
    {
      categoryName: "Cozinha",
      src: EletricOven,
      itemName: "Forno elétrico",
      inputName: "eletric_oven",
      maxRangeInput: 5,
    },
    {
      categoryName: "Cozinha",
      src: Microwave,
      itemName: "Micro-ondas",
      inputName: "microwave",
      maxRangeInput: 10,
    },
    {
      categoryName: "Lavanderia",
      src: WashingMachine,
      itemName: "Máquina de lavar roupa",
      inputName: "washing_machine",
      maxRangeInput: 5,
    },
    {
      categoryName: "Lavanderia",
      src: ClothesDryer,
      itemName: "Secadora de roupas",
      inputName: "clothes_dryer",
      maxRangeInput: 5,
    },
    {
      categoryName: "Banheiro",
      src: Shower,
      itemName: "Chuveiro elétrico",
      inputName: "shower",
      maxRangeInput: 10,
    },
    {
      categoryName: "Banheiro",
      src: HairDryer,
      itemName: "Secador de cabelo",
      inputName: "hair_dryer",
      maxRangeInput: 10,
    },
    {
      categoryName: "Banheiro",
      src: EletricFaucet,
      itemName: "Torneira elétrica",
      inputName: "eletric_faucet",
      maxRangeInput: 10,
    },
    {
      categoryName: "Eletrodomésticos",
      src: AirConditioner,
      itemName: "Ar-condicionado",
      inputName: "air_conditioner",
      maxRangeInput: 10,
    },
    {
      categoryName: "Eletrodomésticos",
      src: Fan,
      itemName: "Ventilador",
      inputName: "fan",
      maxRangeInput: 20,
    },
    {
      categoryName: "Eletrodomésticos",
      src: VacuumCleaner,
      itemName: "Aspirador de pó",
      inputName: "vacuum_cleaner",
      maxRangeInput: 10,
    },
    {
      categoryName: "Eletrodomésticos",
      src: EletricIron,
      itemName: "Ferro elétrico",
      inputName: "eletric_iron",
      maxRangeInput: 10,
    },
    {
      categoryName: "Eletrônicos",
      src: Videogame,
      itemName: "Videogame",
      inputName: "videogame",
      maxRangeInput: 10,
    },
    {
      categoryName: "Eletrônicos",
      src: Tv,
      itemName: "Televisão",
      inputName: "tv",
      maxRangeInput: 10,
    },
    {
      categoryName: "Eletrônicos",
      src: Computer,
      itemName: "Computador",
      inputName: "computer",
      maxRangeInput: 10,
    },
  ];

  const categoryData =
  {
    consumoTotalPercentage: 50,
    tempoTotalPercentage: 20,
    itemMaisConsome: 'chuveiro elétrico',
    itemMaisConsomePercentage: 40,
  }


  const [service, setService] = useState(dataSelect[0].id);


  function handleChangeSelectValue(value: string) {
    setService(value)
  }

  function handleNavigateToDetails() {
    navigation.navigate('consumoDetail')
  }

  return (
    <VStack mt={16} flex={1} px={8}>
      <HeaderActionsUser title="Meu consumo" subtitle="Veja onde está consumindo mais para poder reduzir!" />
      <SelectInput
        selectedValue={service}
        onValueChange={(value) => handleChangeSelectValue(value)}
        data={dataSelect}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <ProgressBar
          textInsideProgressBar={`${categoryData.consumoTotalPercentage}%`}
          percentage={categoryData.consumoTotalPercentage}
          title="Consumo total na sua residência:"
        />
        <ProgressBar
          textInsideProgressBar={`${categoryData.tempoTotalPercentage}%`}
          percentage={categoryData.tempoTotalPercentage}
          title="Tempo total de uso na sua residência:"
        />
        <ProgressBar
          textInsideProgressBar={`${categoryData.itemMaisConsomePercentage}%`}
          percentage={categoryData.itemMaisConsomePercentage}
          title={`Item que mais consome: ${categoryData.itemMaisConsome}`}
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
          showsHorizontalScrollIndicator={false}
          mb={8}
          data={data}
          keyExtractor={(item, index): any => index}
          renderItem={({ item }) => (
            <ItemCard onPress={handleNavigateToDetails} image={item.src} />
          )}
        />

      </ScrollView>
    </VStack>

  )
}