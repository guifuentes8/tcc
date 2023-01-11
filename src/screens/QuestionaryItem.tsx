import { useEffect, useState, useRef } from "react";
import { Controller, useForm } from 'react-hook-form';
import { ImageSourcePropType, ScrollView } from "react-native";

import { MaterialIcons } from '@expo/vector-icons'

import { useNavigation, useScrollToTop } from "@react-navigation/native";

import { Box, Center, HStack, Icon, VStack } from "native-base";

import Refrigerator from '@assets/geladeira.png'
import EletricStove from '@assets/fogao-eletrico.png'
import EletricOven from '@assets/forno-eletrico.png'
import Microwave from '@assets/microondas.png'
import WashingMachine from '@assets/maquina-lavar-roupa.png'
import ClothesDryer from '@assets/secadora-roupa.png'
import Shower from '@assets/chuveiro.png'
import HairDryer from '@assets/secador-cabelo.png'
import EletricFaucet from '@assets/torneira-eletrica.png'
import AirConditioner from '@assets/ar-condicionado.png'
import Fan from '@assets/ventilador.png'
import VacuumCleaner from '@assets/aspirador-po.png'
import EletricIron from '@assets/ferro-eletrico.png'
import Videogame from '@assets/videogame.png'
import Tv from '@assets/tv.png'
import Computer from '@assets/pc.png'

import { QuestionaryHeader } from "@components/QuestionaryHeader";
import { NextButton } from "@components/NextButton";
import { Button } from "@components/Button";
import { SliderRange } from "@components/SliderRange";
import { AskQuestionText } from "@components/AskQuestionText";
import { AppNavigatorStackRoutesProps, AppNavigatorTabRoutesProps } from "@routes/app.routes";
import { Loading } from "@components/Loading";

type QuestionProps = {
  itemName: string;
  titleQuestion: string;
  src: ImageSourcePropType;
  itemText?: string;
  questionAsk: Array<string>;
  maxRangePossession: number;
}

export function QuestionaryItem() {

  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(0);
  const [dayByWeekValue, setDayByWeekValue] = useState(0);
  const [dayByMonthValue, setDayByMonthValue] = useState(0);
  const [valueItemSize, setValueItemSize] = useState(0);
  const [isButtonSelected, setIsButtonSelected] = useState(true);
  const [isButtonFrequencySelected, setIsButtonFrequencySelected] = useState(true);
  const [formData, setFormData] = useState({})
  const [questionData, setQuestionData] = useState<QuestionProps[]>([])
  const ref = useRef<any>(null)

  const { control, handleSubmit } = useForm({
    defaultValues: {
      posses: 0,
      allDay: true,
      hour: 0,
      minutes: 0,
      dayByMonth: 0,
      dayByWeek: 0,
    },
  });

  const navigation = useNavigation<AppNavigatorStackRoutesProps>();

  async function handleQuestionaryForm(data: any) {


    isButtonFrequencySelected ? data.dayByWeek = 0 : data.dayByMonth = 0
    data.posses === undefined ? data.posses = 0 : data.posses
    data.allDay === undefined && isButtonSelected ? data.allDay = true : data.allDay = false
    const questionaryForm = { ...formData, [questionData[step].itemName.toLowerCase()]: data }

    setValueItemSize(0)
    setDayByMonthValue(0)
    setDayByWeekValue(0)

    setFormData(questionaryForm)
    if (step === 15) {
      return navigation.navigate('dashboard')
    }
    setStep(prevState => prevState + 1)
  }



  useEffect(() => {
    setIsButtonSelected(true);
    setIsButtonFrequencySelected(true);
  }, [step])

  useEffect(() => {
    setDayByMonthValue(0)
    setDayByWeekValue(0)
  }, [isButtonFrequencySelected])



  useEffect(() => {
    setQuestionData([
      {
        titleQuestion: 'Cozinha',
        itemName: 'refrigerator',
        src: Refrigerator,
        itemText: 'Geladeira',
        questionAsk: ['Quantas você possui em casa?', 'Quanto tempo o aparelho fica ligado por dia?', 'Com qual frequência você o usa?'],
        maxRangePossession: 5,

      },
      {
        titleQuestion: 'Cozinha',
        itemName: 'EletricStove',
        src: EletricStove,
        itemText: 'Fogão elétrico',
        questionAsk: ['Quantas você possui em casa?', 'Quanto tempo o aparelho fica ligado por dia?', 'Com qual frequência você o usa?'],

        maxRangePossession: 5,

      },
      {
        titleQuestion: 'Cozinha',
        itemName: 'EletricOven',
        src: EletricOven,
        itemText: 'Forno elétrico',
        questionAsk: ['Quantas você possui em casa?', 'Quanto tempo o aparelho fica ligado por dia?', 'Com qual frequência você o usa?'],

        maxRangePossession: 5,

      },
      {
        titleQuestion: 'Cozinha',
        itemName: 'Microwave',
        src: Microwave,
        itemText: 'Micro-ondas',
        questionAsk: ['Quantas você possui em casa?', 'Quanto tempo o aparelho fica ligado por dia?', 'Com qual frequência você o usa?'],

        maxRangePossession: 10,
      },
      {
        titleQuestion: 'Lavanderia',
        itemName: 'WashingMachine',
        src: WashingMachine,
        itemText: 'Máquina de lavar roupa',
        questionAsk: ['Quantas você possui em casa?', 'Quanto tempo o aparelho fica ligado por dia?', 'Com qual frequência você o usa?'],

        maxRangePossession: 5,
      },
      {
        titleQuestion: 'Lavanderia',
        itemName: 'ClothesDryer',
        src: ClothesDryer,
        itemText: 'Secadora de roupas',
        questionAsk: ['Quantas você possui em casa?', 'Quanto tempo o aparelho fica ligado por dia?', 'Com qual frequência você o usa?'],

        maxRangePossession: 5,
      },
      {
        titleQuestion: 'Banheiro',
        itemName: 'Shower',
        src: Shower,
        itemText: 'Chuveiro elétrico',
        questionAsk: ['Quantas você possui em casa?', 'Quanto tempo o aparelho fica ligado por dia?', 'Com qual frequência você o usa?'],

        maxRangePossession: 10,
      },
      {
        titleQuestion: 'Banheiro',
        itemName: 'HairDryer',
        src: HairDryer,
        itemText: 'Secador de cabelo',
        questionAsk: ['Quantas você possui em casa?', 'Quanto tempo o aparelho fica ligado por dia?', 'Com qual frequência você o usa?'],

        maxRangePossession: 10,
      },
      {
        titleQuestion: 'Banheiro',
        itemName: 'EletricFaucet',
        src: EletricFaucet,
        itemText: 'Torneira elétrica',
        questionAsk: ['Quantas você possui em casa?', 'Quanto tempo o aparelho fica ligado por dia?', 'Com qual frequência você o usa?'],

        maxRangePossession: 20,
      },
      {
        titleQuestion: 'Eletrodomésticos',
        itemName: 'AirConditioner',
        src: AirConditioner,
        itemText: 'Ar-condicionado',
        questionAsk: ['Quantas você possui em casa?', 'Quanto tempo o aparelho fica ligado por dia?', 'Com qual frequência você o usa?'],

        maxRangePossession: 20,
      },
      {
        titleQuestion: 'Eletrodomésticos',
        itemName: 'Fan',
        src: Fan,
        itemText: 'Ventilador',
        questionAsk: ['Quantas você possui em casa?', 'Quanto tempo o aparelho fica ligado por dia?', 'Com qual frequência você o usa?'],

        maxRangePossession: 20,
      },
      {
        titleQuestion: 'Eletrodomésticos',
        itemName: 'VacuumCleaner',
        src: VacuumCleaner,
        itemText: 'Aspirador de pó',
        questionAsk: ['Quantas você possui em casa?', 'Quanto tempo o aparelho fica ligado por dia?', 'Com qual frequência você o usa?'],

        maxRangePossession: 10,
      },
      {
        titleQuestion: 'Eletrodomésticos',
        itemName: 'EletricIron',
        src: EletricIron,
        itemText: 'Ferro elétrico',
        questionAsk: ['Quantas você possui em casa?', 'Quanto tempo o aparelho fica ligado por dia?', 'Com qual frequência você o usa?'],

        maxRangePossession: 20,
      },
      {
        titleQuestion: 'Eletrônicos',
        itemName: 'Videogame',
        src: Videogame,
        itemText: 'Videogame',
        questionAsk: ['Quantas você possui em casa?', 'Quanto tempo o aparelho fica ligado por dia?', 'Com qual frequência você o usa?'],

        maxRangePossession: 5,
      },
      {
        titleQuestion: 'Eletrônicos',
        itemName: 'Tv',
        src: Tv,
        itemText: 'Televisão',
        questionAsk: ['Quantas você possui em casa?', 'Quanto tempo o aparelho fica ligado por dia?', 'Com qual frequência você o usa?'],

        maxRangePossession: 20,
      },
      {
        titleQuestion: 'Eletrônicos',
        itemName: 'Computer',
        src: Computer,
        itemText: 'Computador',
        questionAsk: ['Quantas você possui em casa?', 'Quanto tempo o aparelho fica ligado por dia?', 'Com qual frequência você o usa?'],
        maxRangePossession: 20,
      },
    ])
  }, [])

  return (
    <ScrollView
      ref={ref}
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}>
      <VStack mt={12} px={8} pb={4}>
        {questionData.length > 0 &&
          <>
            <Center mb={6}>
              <QuestionaryHeader
                titleQuestion={questionData[step]?.titleQuestion}
                srcImage={questionData[step]?.src}
                key={questionData[step]?.itemText}
                itemText={questionData[step]?.itemText}
              />
            </Center>
            <VStack mb={6}>
              <Box mb={18}>
                <AskQuestionText question={questionData[step]?.questionAsk[0]} />
              </Box>
              <Controller
                defaultValue={0}
                key="posses"
                control={control}
                name="posses"
                render={({ field: { onChange } }) => (
                  <SliderRange

                    onChange={(v) => {
                      setValueItemSize(v)
                      onChange(v)
                    }}
                    value={valueItemSize}
                    myValue={valueItemSize}
                    min={0}
                    max={questionData[step]?.maxRangePossession}
                  />
                )}
              />
            </VStack>

            <AskQuestionText question={questionData[step]?.questionAsk[1]} />
            <HStack justifyContent="space-between" my={6}>
              <Controller
                key="allDay"
                control={control}
                name="allDay"
                render={({ field: { onChange } }) => (
                  <Button
                    fontSize="20px"
                    w={33}
                    title="24 horas"
                    selected={isButtonSelected}
                    onPress={() => {
                      setIsButtonSelected(!isButtonSelected)
                      onChange(!isButtonSelected)
                    }}
                  />

                )}
              />

              <Button
                fontSize="20px"
                w={33}
                title="Hora / Min"
                selected={!isButtonSelected}
                onPress={() => {
                  setIsButtonSelected(!isButtonSelected)
                }}
              />


            </HStack>
            {!isButtonSelected &&
              <VStack>
                <HStack>
                  <Center flexDirection="row" ml={-2}>
                    <Icon mr={1} as={MaterialIcons} name="schedule" size={6} color="green.100" />
                    <AskQuestionText question="Horas:" />
                  </Center>
                </HStack>

                <Controller
                  key="hour"
                  control={control}
                  name="hour"
                  render={({ field: { value, onChange } }) => (
                    <SliderRange
                      mb={6}
                      defaultValue={0}
                      onChange={onChange}
                      myValue={value}
                      value={value}
                      min={0}
                      max={23}
                    />
                  )}
                />

                <HStack>
                  <Center flexDirection="row" ml={-2}>
                    <Icon mr={1} as={MaterialIcons} name="timer" size={6} color="green.100" />
                    <AskQuestionText question="Minutos:" />
                  </Center>
                </HStack>
                <Controller
                  key='minutes'
                  control={control}
                  name="minutes"
                  render={({ field: { value, onChange } }) => (
                    <SliderRange
                      mb={8}
                      defaultValue={0}
                      onChange={onChange}
                      myValue={value}
                      value={value}
                      step={15}
                      min={0}
                      max={45}
                    />
                  )}
                />
              </VStack>
            }


            <AskQuestionText question={questionData[step]?.questionAsk[2]} />

            <HStack justifyContent="space-between" my={6}>

              <Button
                fontSize="20px"
                w={33}
                title="Mensal"
                selected={isButtonFrequencySelected}
                onPress={() => {
                  setIsButtonFrequencySelected(!isButtonFrequencySelected)
                }}
              />

              <Button
                fontSize="20px"
                w={33}
                title="Semanal"
                selected={!isButtonFrequencySelected}
                onPress={() => {
                  setIsButtonFrequencySelected(!isButtonFrequencySelected)
                }}
              />
            </HStack>

            <Box mb={18}>
              <AskQuestionText question={`Quantidade de dias por ${isButtonFrequencySelected ? 'mês' : 'semana'} que você usa:`} />
            </Box>

            {isButtonFrequencySelected && (
              <Controller
                key="dayByMonth"
                control={control}
                name='dayByMonth'
                defaultValue={0}
                render={({ field: { onChange } }) => (
                  <SliderRange
                    onChange={(v) => {
                      setDayByMonthValue(v)
                      onChange(v)
                    }}
                    value={dayByMonthValue}
                    myValue={dayByMonthValue}
                    min={0}
                    max={30}
                  />
                )}
              />
            )}

            {!isButtonFrequencySelected && (
              <Controller
                key="dayByWeek"
                control={control}
                name='dayByWeek'
                defaultValue={0}
                render={({ field: { onChange } }) => (
                  <SliderRange
                    onChange={(v) => {
                      setDayByWeekValue(v)
                      onChange(v)
                    }}
                    value={dayByWeekValue}
                    myValue={dayByWeekValue}
                    min={0}
                    max={7}
                  />
                )}
              />
            )}
          </>
        }

        <HStack flex={1} my={8} alignItems="center" justifyContent='space-between'>
          {/* {step > 0 && <NextButton onPress={() => setStep(prevState => prevState - 1)} action="Anterior" icon="arrow-back" />} */}
          <Button title="Pular" maxW={32} onPress={() => setStep((prev) => prev + 1)} />
          <NextButton onPress={() => {
            ref?.current?.scrollTo({ offset: 0, animated: true });
            handleSubmit(handleQuestionaryForm)()
          }} action="Próxima" icon="arrow-forward" />

        </HStack>
      </VStack>
    </ScrollView>
  )
}