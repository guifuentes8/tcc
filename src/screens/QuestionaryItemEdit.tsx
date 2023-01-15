import { useEffect, useState, useRef } from "react";
import { Controller, useForm } from 'react-hook-form';
import { ImageSourcePropType } from "react-native";

import { MaterialIcons } from '@expo/vector-icons'

import { useNavigation } from "@react-navigation/native";

import { Box, Center, HStack, Icon, VStack, ScrollView } from "native-base";

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

export function QuestionaryItemEdit() {

  const [isLoading, setIsLoading] = useState(false);

  const questionData = [
    {
      titleQuestion: 'Cozinha',
      itemName: 'refrigerator',
      src: Refrigerator,
      itemText: 'Geladeira',
      maxRangePossession: 5,
      quantidade: 3,
      hours: 4,
      minutes: 25,
      allDay: true,
      dayByMonth: 4,
      dayByWeek: 6,
      buttonMonthSelected: false
    },

  ]
  const [dayByWeekValue, setDayByWeekValue] = useState(questionData[0].dayByWeek);
  const [dayByMonthValue, setDayByMonthValue] = useState(questionData[0].dayByMonth);
  const [valueItemSize, setValueItemSize] = useState(questionData[0]?.quantidade);
  const [isButtonSelected, setIsButtonSelected] = useState(questionData[0].allDay);
  const [isButtonFrequencySelected, setIsButtonFrequencySelected] = useState(questionData[0].buttonMonthSelected);
  const [formData, setFormData] = useState({})
  const ref = useRef<any>(null)

  const questions = ['Quantos você possui em casa?', 'Quanto tempo o aparelho fica ligado?', 'Com qual frequência você o usa?']

  const { control, handleSubmit } = useForm({
    defaultValues: {
      posses: questionData[0].quantidade,
      allDay: true,
      hour: questionData[0].hours,
      minutes: questionData[0].minutes,
      dayByMonth: questionData[0].dayByMonth,
      dayByWeek: questionData[0].dayByWeek,
    },
  });

  const navigation = useNavigation<AppNavigatorStackRoutesProps>();
  const navigationTab = useNavigation<AppNavigatorTabRoutesProps>();

  function handleGoBack() {
    navigationTab.goBack()
  }

  async function handleQuestionaryForm(data: any) {

    isButtonFrequencySelected ? data.dayByWeek = 0 : data.dayByMonth = 0
    data.posses === undefined ? data.posses = 0 : data.posses
    data.allDay === undefined && isButtonSelected ? data.allDay = true : data.allDay = false
    const questionaryForm = { ...formData, [questionData[0].itemName.toLowerCase()]: data }


    setFormData(questionaryForm)
    return navigation.navigate('dashboardTab')
  }

  return (
    <ScrollView
      ref={ref}
      mt={12}
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >

      <VStack px={8} flex={1}>
        {questionData.length > 0 &&
          <>
            <Center mb={6}>
              <QuestionaryHeader
                titleQuestion={questionData[0]?.titleQuestion}
                srcImage={questionData[0]?.src}
                key={questionData[0]?.itemText}
                itemText={questionData[0]?.itemText}
              />
            </Center>
            <VStack mb={6}>
              <Box mb={18}>
                <AskQuestionText question={questions[0]} />
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
                    max={questionData[0]?.maxRangePossession}
                  />
                )}
              />
            </VStack>

            <AskQuestionText question={questions[1]} />
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
              <>
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
                        step={5}
                        min={0}
                        max={55}
                      />
                    )}
                  />
                </VStack>


                <AskQuestionText question={questions[2]} />

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
          </>
        }
        <HStack flex={1} py={8} alignItems="flex-end" justifyContent='space-between'>
          {/* {0 > 0 && <NextButton onPress={() => setStep(prevState => prevState - 1)} action="Anterior" icon="arrow-back" />} */}

          <NextButton onPress={handleGoBack} action="Voltar" icon="arrow-back" />
          <Button selected title="Salvar" maxW={40} onPress={handleSubmit(handleQuestionaryForm)} />


        </HStack>
      </VStack>
    </ScrollView>
  )
}