import { useEffect, useState, useRef } from "react";
import { Controller, useForm } from 'react-hook-form';

import { MaterialIcons } from '@expo/vector-icons'

import { useNavigation } from "@react-navigation/native";

import { Box, Center, HStack, Icon, VStack, ScrollView } from "native-base";

import { QuestionsData, Questions } from "@utils/QuestionsData";

import { QuestionaryHeader } from "@components/QuestionaryHeader";
import { NextButton } from "@components/NextButton";
import { Button } from "@components/Button";
import { SliderRange } from "@components/SliderRange";
import { AskQuestionText } from "@components/AskQuestionText";
import { AppNavigatorStackRoutesProps, AppNavigatorTabRoutesProps } from "@routes/app.routes";
import { Loading } from "@components/Loading";

export function QuestionaryItem() {

  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(0);
  const [dayByWeekValue, setDayByWeekValue] = useState(0);
  const [dayByMonthValue, setDayByMonthValue] = useState(0);
  const [valueItemSize, setValueItemSize] = useState(0);
  const [isButtonSelected, setIsButtonSelected] = useState(true);
  const [isButtonFrequencySelected, setIsButtonFrequencySelected] = useState(true);
  const [formData, setFormData] = useState({})
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
    const questionaryForm = { ...formData, [QuestionsData[step].inputName.toLowerCase()]: data }

    setValueItemSize(0)
    setDayByMonthValue(0)
    setDayByWeekValue(0)

    setFormData(questionaryForm)

    setStep(prevState => prevState + 1)
  }

  useEffect(() => {
    if (step === 15) {
      return navigation.navigate('dashboardTab')
    }
    setIsButtonSelected(true);
    setIsButtonFrequencySelected(true);
  }, [step])

  useEffect(() => {
    setDayByMonthValue(0)
    setDayByWeekValue(0)
  }, [isButtonFrequencySelected])

  return (
    <ScrollView
      ref={ref}
      mt={12}
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >

      <VStack px={8} flex={1}>
        {QuestionsData.length > 0 &&
          <>
            <Center mb={6}>
              <QuestionaryHeader
                titleQuestion={QuestionsData[step]?.categoryName}
                srcImage={QuestionsData[step]?.src}
                key={QuestionsData[step]?.itemName}
                itemText={QuestionsData[step]?.itemName}
              />
            </Center>
            <VStack mb={6}>
              <Box mb={18}>
                <AskQuestionText question={Questions[0]} />
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
                    max={QuestionsData[step]?.maxRangeInput}
                  />
                )}
              />
            </VStack>

            <AskQuestionText question={Questions[1]} />
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


                <AskQuestionText question={Questions[2]} />

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
          </>
        }
        <HStack flex={1} py={8} alignItems="flex-end" justifyContent='space-between'>
          {/* {step > 0 && <NextButton onPress={() => setStep(prevState => prevState - 1)} action="Anterior" icon="arrow-back" />} */}
          <Button selected title="Pular" maxW={32} onPress={() => {
            ref?.current?.scrollTo({ offset: 0, animated: true });
            setStep(prevState => prevState + 1)

          }} />
          <NextButton onPress={() => {
            ref?.current?.scrollTo({ offset: 0, animated: true });
            handleSubmit(handleQuestionaryForm)()
          }} action="Próxima" icon="arrow-forward" />

        </HStack>
      </VStack>
    </ScrollView>
  )
}