import { useEffect, useState, useRef } from "react";
import { Controller, useForm } from 'react-hook-form';

import { MaterialIcons } from '@expo/vector-icons'
import { useNavigation } from "@react-navigation/native";

import { Box, Center, HStack, Icon, VStack, ScrollView } from "native-base";

import { QuestionaryHeader } from "@components/QuestionaryHeader";
import { NextButton } from "@components/NextButton";
import { Button } from "@components/Button";
import { SliderRange } from "@components/SliderRange";
import { AskQuestionText } from "@components/AskQuestionText";
import { AppNavigatorStackRoutesProps, AppNavigatorTabRoutesProps } from "@routes/app.routes";
import { Loading } from "@components/Loading";
import { api } from "@services/api";
import { useAuth } from "@hooks/useAuth";

type questionDataProps = {
  category_id: number;
  category_name: string;
  id: number;
  name: string;
  photo: string;
  input_name: string;
  default_watts: number;
  max_select_range: number;
  flag_residents: boolean;
};

export function QuestionaryItem() {

  const [isLoading, setIsLoading] = useState(false);
  const [questionData, setQuestionData] = useState<questionDataProps[]>([]);
  const [pulo, setPulo] = useState(false);
  const [step, setStep] = useState(0);
  const [dayByWeekValue, setDayByWeekValue] = useState(0);
  const [dayByMonthValue, setDayByMonthValue] = useState(0);
  const [valueItemSize, setValueItemSize] = useState(step >= 1 ? 0 : 1);
  const [isButtonSelected, setIsButtonSelected] = useState(true);
  const [isButtonFrequencySelected, setIsButtonFrequencySelected] = useState(true);
  const ref = useRef<any>(null)
  const [myData, setMyData] = useState<any[]>([])

  const navigation = useNavigation<AppNavigatorStackRoutesProps>();

  const { user } = useAuth()

  const questions = [
    "Quantos você possui em casa?",
    "Quanto tempo o aparelho fica ligado?",
    "Com qual frequência você o usa?",
  ];

  const { control, handleSubmit, resetField } = useForm({
    defaultValues: {
      quant_item: 0,
      all_day: true,
      hours: 0,
      minutes: 0,
      dayByMonth: 0,
      dayByWeek: 0,
    },
  });

  async function getQuestionaryItems() {
    try {
      setIsLoading(true)

      const { data } = await api.get('/items')

      setQuestionData(data)

    } catch (error) {

    } finally {
      setIsLoading(false)
    }
  }

  async function handleQuestionaryForm(data: any) {
    data.user_id = user.id
    data.item_id = questionData[step]?.id
    data.quant_item = data.quant_item === 0 && step < 1 ? 1 : data.quant_item
    isButtonFrequencySelected ? data.dayByWeek = 0 : data.dayByMonth = 0
    isButtonSelected ? data.all_day = true : data.all_day = false

    if (step < 15) {
      if (pulo && step > 0) {
        setMyData(prevArray => [...prevArray])

      } else {

        setMyData(prevArray => [...prevArray, data])
      }
    }

    setValueItemSize(0)
    setDayByMonthValue(0)
    setDayByWeekValue(0)

    try {
      if (step === 15) {

        setIsLoading(true)
        const dataSend = { userId: user.id, questions: pulo ? [...myData] : [...myData, data] }

        console.log(dataSend)

        const response = await api.post('/questions', dataSend)
      }
    } catch (error) {

    } finally {
      setIsLoading(false)
      setPulo(false)
      stepMoreOne()
    }
  }


  function stepMoreOne() {
    return setStep(prevState => prevState + 1)
  }

  useEffect(() => {

    setPulo(true)

    if (step > 15) {
      return navigation.navigate('dashboardTab')
    }

    setValueItemSize(step < 1 ? 1 : 0)
    setIsButtonSelected(true);
    setIsButtonFrequencySelected(true);
    resetField('quant_item')
    resetField('hours')
    resetField('minutes')
  }, [step])

  useEffect(() => {
    setDayByMonthValue(0)
    setDayByWeekValue(0)
  }, [isButtonFrequencySelected])

  useEffect(() => {
    getQuestionaryItems()
  }, [])


  return (
    <>
      {isLoading && <Loading />}
      {!isLoading &&
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
                    titleQuestion={questionData[step]?.category_name}
                    srcPath={questionData[step]?.photo}
                    key={questionData[step]?.id}
                    itemText={questionData[step]?.name}
                  />
                </Center>
                <VStack mb={6}>
                  <Box mb={18}>
                    <AskQuestionText question={questions[0]} />
                  </Box>
                  <Controller
                    defaultValue={step >= 1 ? 0 : 1}
                    key="quant_item"
                    control={control}
                    name="quant_item"
                    render={({ field: { onChange } }) => (
                      <SliderRange
                        onChange={(v) => {
                          setValueItemSize(v)
                          onChange(v)
                        }}
                        value={valueItemSize}
                        myValue={valueItemSize}
                        min={step >= 1 ? 0 : 1}
                        max={questionData[step]?.max_select_range}
                      />
                    )}
                  />
                </VStack>

                <AskQuestionText question={questions[1]} />
                <HStack justifyContent="space-between" my={6}>
                  <Controller
                    key="all_day"
                    control={control}
                    name="all_day"
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
                        key="hours"
                        control={control}
                        name="hours"
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
            <HStack flex={1} py={8} alignItems="flex-end" justifyContent={step >= 1 ? 'space-between' : 'flex-end'}>

              {step >= 1 && <Button selected title="Pular" maxW={32} onPress={() => {
                setPulo(true)
                handleSubmit(handleQuestionaryForm)()
                ref?.current?.scrollTo({ offset: 0, animated: true });

              }}
              />
              }
              <NextButton onPress={() => {
                ref?.current?.scrollTo({ offset: 0, animated: true });
                handleSubmit(handleQuestionaryForm)()
              }} action="Próxima" icon="arrow-forward" />

            </HStack>
          </VStack>
        </ScrollView>
      }
    </>

  )
}