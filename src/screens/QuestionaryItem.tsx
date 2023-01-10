import { useEffect, useState } from "react";
import { Controller, useForm } from 'react-hook-form';
import { ImageSourcePropType, StyleSheet } from "react-native";

import { useNavigation } from "@react-navigation/native";

import { HStack, ScrollView, Switch, VStack } from "native-base";

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

type QuestionProps = {
  itemName: string;
  titleQuestion: string;
  src: ImageSourcePropType;
  itemText?: string;
  questionAsk: Array<string>;
  maxRangePossession: number;
}



export function QuestionaryItem() {

  const [step, setStep] = useState(0);
  const [isButtonSelected, setIsButtonSelected] = useState(true);
  const [isButtonFrequencySelected, setIsButtonFrequencySelected] = useState(true);
  const [questionData, setQuestionData] = useState<QuestionProps[]>([])
  const [formData, setFormData] = useState({})

  const { control, handleSubmit, resetField } = useForm({
    defaultValues: {
      posses: 0,
      allDay: true,
      hour: 0,
      minutes: 0,
      dayByMonth: 0,
      dayByWeek: 0,
    }
  });

  const navigation = useNavigation<AppNavigatorStackRoutesProps>();

  function handleQuestionaryForm(data: any) {


    data.posses === undefined ? data.posses = 0 : data.posses
    data.allDay === undefined && isButtonSelected ? data.allDay = true : data.allDay = false
    const questionaryForm = { ...formData, [questionData[step].itemName.toLowerCase()]: data }

    setFormData(questionaryForm)
    if (step === 15) {
      return navigation.navigate('dashboard')
    }
    setStep(prevState => prevState + 1)

    resetField('posses')
    resetField('dayByMonth')
    resetField('dayByWeek')


  }

  useEffect(() => {
    setIsButtonSelected(true);
    setIsButtonFrequencySelected(true);
  }, [step])

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


  function PossesRangeInput() {
    return (
      <Controller
        key="posses"
        control={control}
        name="posses"
        defaultValue={0}
        render={({ field: { value, onChange } }) => (
          <SliderRange
            defaultValue={0}
            onChange={onChange}
            min={0}
            value={value}
            max={questionData[step]?.maxRangePossession}
          />
        )}
      />
    )
  }

  function DaySlideInput() {
    return isButtonFrequencySelected ? (
      <Controller
        key="dayByMonth"
        control={control}
        name='dayByMonth'
        defaultValue={0}
        render={({ field: { value, onChange } }) => (
          <SliderRange
            defaultValue={0}
            onChange={onChange}
            value={value}
            step={3}
            min={0}
            max={30}
          />
        )}
      />
    ) : (
      <Controller
        key="dayByWeek"
        control={control}
        name='dayByWeek'
        defaultValue={0}
        render={({ field: { value, onChange } }) => (
          <SliderRange
            defaultValue={0}
            onChange={onChange}
            value={value}
            min={0}
            max={7}
          />
        )}
      />
    )

  }


  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
      <VStack mt={12} px={8} pb={4}>
        {questionData.length > 0 &&
          <>
            <QuestionaryHeader
              titleQuestion={questionData[step]?.titleQuestion}
              srcImage={questionData[step]?.src}
              key={questionData[step]?.itemText}
              itemText={`Item selecionado: ${questionData[step]?.itemText}`}
            />

            <AskQuestionText question={questionData[step]?.questionAsk[0]} />
            <PossesRangeInput />

            <AskQuestionText question={questionData[step]?.questionAsk[1]} />
            <HStack justifyContent="space-between" mb={4}>


              <Controller
                key="allDay"
                control={control}
                name="allDay"
                render={({ field: { onChange } }) => (
                  <Button
                    fontSize="xs"
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
                fontSize="xs"
                w={33}
                title="Hora / min"
                selected={!isButtonSelected}
                onPress={() => {
                  setIsButtonSelected(!isButtonSelected)
                }}
              />


            </HStack>
            {!isButtonSelected &&
              <VStack mt={4} >
                <AskQuestionText question="Horas" />
                <Controller
                  key="hour"
                  control={control}
                  name="hour"
                  render={({ field: { value, onChange } }) => (
                    <SliderRange

                      defaultValue={0}
                      onChange={onChange}
                      value={value}
                      min={0}
                      max={23}
                    />
                  )}
                />

                <AskQuestionText question="Minutos" />
                <Controller
                  key='minutes'
                  control={control}
                  name="minutes"
                  render={({ field: { value, onChange } }) => (
                    <SliderRange
                      defaultValue={0}
                      onChange={onChange}
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

            <HStack justifyContent="space-between" mb={4}>

              <Button
                fontSize="xs"
                w={33}
                title="Mensal"
                selected={isButtonFrequencySelected}
                onPress={() => {
                  setIsButtonFrequencySelected(!isButtonFrequencySelected)
                }}
              />

              <Button
                fontSize="xs"
                w={33}
                title="Semanal"
                selected={!isButtonFrequencySelected}
                onPress={() => {
                  setIsButtonFrequencySelected(!isButtonFrequencySelected)
                }}
              />

            </HStack>

            <AskQuestionText question={`Quantidade de dias por ${isButtonFrequencySelected ? 'mês' : 'semana'} que você usa:`} />

            <DaySlideInput />
          </>
        }


        <HStack flex={1} mb={8} alignItems="flex-end" justifyContent='space-between'>
          {/* {step > 0 && <NextButton onPress={() => setStep(prevState => prevState - 1)} action="Anterior" icon="arrow-back" />} */}
          <Button title="pular" maxW={32} mb={8} upperCase onPress={() => setStep((prev) => prev + 1)} />
          <NextButton onPress={handleSubmit(handleQuestionaryForm)} action="Próxima" icon="arrow-forward" />
        </HStack>
      </VStack>

    </ScrollView>
  )
}