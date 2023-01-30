import { useEffect, useState, useRef } from "react";
import { Controller, useForm } from 'react-hook-form';
import { ImageSourcePropType } from "react-native";

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

type QuestionProps = {
  itemName: string;
  titleQuestion: string;
  src: ImageSourcePropType;
  itemText?: string;
  questionAsk: Array<string>;
  maxRangePossession: number;
}

export function QuestionaryItemEdit({ route }: any) {

  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingPost, setIsLoadingPost] = useState(false);
  const [questionData, setQuestionData] = useState<any[]>([]);

  const { itemId } = route.params

  const [dayByWeekValue, setDayByWeekValue] = useState(0);
  const [dayByMonthValue, setDayByMonthValue] = useState(0);
  const [valueItemSize, setValueItemSize] = useState(0);
  const [isButtonSelected, setIsButtonSelected] = useState(true);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);
  const [isButtonFrequencySelected, setIsButtonFrequencySelected] = useState(true);
  const ref = useRef<any>(null)
  const { user } = useAuth()

  const questions = ['Quantos você possui em casa?', 'Quanto tempo o aparelho fica ligado por dia?', 'Com qual frequência você o usa?']

  const { control, handleSubmit } = useForm({
    defaultValues: {
      quant_item: 0,
      all_day: true,
      hours: 0,
      minutes: 0,
      dayByMonth: 0,
      dayByWeek: 0,
    },
  });

  const navigation = useNavigation<AppNavigatorStackRoutesProps>();
  const navigationTab = useNavigation<AppNavigatorTabRoutesProps>();

  function handleGoBack() {
    navigationTab.goBack()
  }

  async function handleGetFormDataQuestions() {

    try {
      setIsLoading(true)

      const { data } = await api.get(`/questions/${itemId}/${user.id}`)

      setQuestionData(data)
      setIsButtonSelected(data[0]?.all_day === 1)
      setValueItemSize(data[0]?.quant_item)
      setHours(data[0]?.hours ? data[0]?.hours : 0)
      setMinutes(data[0]?.minutes ? data[0]?.minutes : 0)
      setIsButtonFrequencySelected(data[0]?.dayByMonth > 0)
      setDayByWeekValue(data[0]?.dayByWeek ? data[0]?.dayByWeek : 0)
      setDayByMonthValue(data[0]?.dayByMonth ? data[0]?.dayByMonth : 0)

    } catch (error) {

    } finally {
      setIsLoading(false)
    }

  }

  async function handleQuestionaryForm(data: any) {

    data.item_id = questionData[0].id
    data.user_id = user.id
    data.quant_item = valueItemSize
    data.all_day = isButtonSelected ? true : false
    data.hours = isButtonSelected ? 0 : hours
    data.minutes = isButtonSelected ? 0 : minutes
    data.dayByMonth = isButtonSelected ? 0 : dayByMonthValue
    data.dayByWeek = isButtonSelected ? 0 : dayByWeekValue
    isButtonFrequencySelected ? data.dayByWeek = 0 : data.dayByMonth = 0


    try {
      setIsLoadingPost(true)
      const response = await api.post('/questions/update', { userId: user.id, question: data, itemId: questionData[0].id })

    } catch (error) {

    } finally {
      setIsLoadingPost(false)

    }
    return navigation.navigate('dashboardTab')
  }

  useEffect(() => {
    handleGetFormDataQuestions()
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
            {questionData && questionData?.length > 0 &&
              <>
                <Center mb={6}>
                  <QuestionaryHeader
                    titleQuestion={questionData[0]?.cat_name}
                    srcPath={questionData[0]?.photo}
                    key={questionData[0]?.id}
                    itemText={questionData[0]?.name}
                  />
                </Center>
                <VStack mb={6}>
                  <Box mb={18}>
                    <AskQuestionText question={questions[0]} />
                  </Box>
                  <Controller
                    defaultValue={0}
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
                        min={0}
                        max={questionData[0]?.max_select_range}
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
                        render={({ field: { onChange } }) => (
                          <SliderRange
                            mb={6}
                            defaultValue={hours}
                            onChange={(v) => {
                              setHours(v)
                              onChange(v)
                            }}
                            myValue={hours}
                            value={hours}
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
                        render={({ field: { onChange } }) => (
                          <SliderRange
                            mb={8}
                            defaultValue={minutes}
                            onChange={(v) => {
                              setMinutes(v)
                              onChange(v)
                            }}
                            myValue={minutes}
                            value={minutes}
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


              <NextButton onPress={handleGoBack} action="Voltar" icon="arrow-back" />
              <Button mb={6} isLoading={isLoadingPost} selected title="Salvar" maxW={40} onPress={handleSubmit(handleQuestionaryForm)} />

            </HStack>
          </VStack>
        </ScrollView>
      }
    </>

  )
}