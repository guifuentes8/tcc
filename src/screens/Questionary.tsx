import { useEffect, useState } from "react";
import { Controller, useForm } from 'react-hook-form';
import { ImageSourcePropType, StyleSheet } from "react-native";

import { MaskedTextInput, MaskedTextInputProps } from "react-native-mask-text";

import { HStack, ScrollView, VStack } from "native-base";

import Coins from '@assets/coins.png'
import Residents from '@assets/users.png'
import Comfort from '@assets/door.png'

import { QuestionaryHeader } from "@components/QuestionaryHeader";
import { InputQuestionary } from "@components/InputQuestionary";
import { NextButton } from "@components/NextButton";
import { Button } from "@components/Button";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorStackRoutesProps } from "@routes/app.routes";
import { SliderRange } from "@components/SliderRange";
import { api } from "@services/api";
import { useAuth } from "@hooks/useAuth";


export function Questionary() {

  const [step, setStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [inputValueResidents, setInputValueResidents] = useState(1);
  const [inputValueComforts, setInputValueComforts] = useState(1);
  const [formData, setFormData] = useState<any>({})

  const { user } = useAuth()

  const { control, handleSubmit } = useForm();

  const navigation = useNavigation<AppNavigatorStackRoutesProps>();

  const questionData = [{
    titleQuestion: 'Questão 1',
    src: Coins,
    questionText: 'Quanto você paga na sua conta de energia?',
  },
  {
    titleQuestion: 'Questão 2',
    src: Residents,
    questionText: 'Quantos moradores residem contando com você?',
  },
  {
    titleQuestion: 'Questão 3',
    src: Comfort,
    questionText: 'Quantos cômodos sua casa possui?',
  }]



  async function handleQuestionaryForm(data: any) {
    try {
      if (step === 2) {
        setIsLoading(true)
        const response = await api.post('/questions/user', { userId: user.id, questions: data })
        goToItemQuestionary()
      }

    } catch (error) {

    } finally {
      setIsLoading(false)
      if (step < 2)
        setStep(prevState => prevState + 1)

    }
  }

  function goToItemQuestionary() {
    navigation.navigate('questionaryItem')
  }


  return (
    <ScrollView flex={1} mt={12} pb={4} contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
      <VStack flex={1} px={8}>

        {questionData?.length > 0 &&
          <>
            <QuestionaryHeader
              titleQuestion={questionData[step]?.titleQuestion}
              srcImage={questionData[step]?.src}
              questionText={questionData[step]?.questionText}
              key={questionData[step]?.titleQuestion}
            />

            {step === 0 &&
              <Controller
                defaultValue={0}
                control={control}
                name="energy_bill"
                render={({ field: { onChange } }) => (
                  <MaskedTextInput
                    onChangeText={(text, rawText) => {
                      onChange(String(Number(rawText) / 100))
                    }}
                    value={formData?.energy_bill?.length > 0 ? String(Number(formData.energy_bill * 100)) : '0'}
                    type="currency"
                    options={{
                      prefix: 'R$ ',
                      decimalSeparator: ',',
                      groupSeparator: '.',
                      precision: 2
                    }}
                    keyboardType="numeric"
                    style={styles.input}
                  />

                )}
              />}
          </>
        }

        {questionData?.length > 0 && step === 1 &&
          <Controller
            defaultValue={1}
            key="residents"
            control={control}
            name="residents"
            render={({ field: { onChange } }) => (
              <SliderRange
                onChange={(v) => {
                  setInputValueResidents(v)
                  onChange(v)
                }}
                value={inputValueResidents}
                myValue={inputValueResidents}
                min={1}
                max={10}
              />
            )}
          />
        }
        {questionData?.length > 0 && step === 2 &&
          <Controller
            defaultValue={1}
            key="comforts"
            control={control}
            name="comforts"
            render={({ field: { onChange } }) => (
              <SliderRange
                onChange={(v) => {
                  setInputValueComforts(v)
                  onChange(v)
                }}
                value={inputValueComforts}
                myValue={inputValueComforts}
                min={1}
                max={20}
              />
            )}
          />
        }


        <HStack flex={1} mb={8} alignItems="flex-end" justifyContent={step > 0 ? 'space-between' : 'flex-end'}>
          {step > 0 && <NextButton onPress={() => setStep(prevState => prevState - 1)} action="Anterior" icon="arrow-back" />}
          {step > 2 && <Button title="pular" maxW={32} mb={8} upperCase />}
          <NextButton onPress={handleSubmit(handleQuestionaryForm)} action="Próxima" icon="arrow-forward" />
        </HStack>
      </VStack>

    </ScrollView>
  )
}

const styles = StyleSheet.create({
  input: {
    marginTop: 32,
    marginBottom: 32,
    height: 64,
    borderWidth: 2,
    borderRadius: 6,
    paddingLeft: 16,
    fontSize: 24,
    fontFamily: "Inter_600SemiBold",
    color: '#00FFA3',
    borderColor: '#00FFA3'
  },
});