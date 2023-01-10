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

type QuestionProps = {
  inputName: string;
  titleQuestion: string;
  src: ImageSourcePropType;
  questionText: string;
  itemText?: string;
}

type InputCurrencyProps = MaskedTextInputProps;

export function Questionary() {

  const [step, setStep] = useState(0);
  const [questionData, setQuestionData] = useState<QuestionProps[]>([])

  const { control, handleSubmit } = useForm();

  const navigation = useNavigation<AppNavigatorStackRoutesProps>();

  function handleQuestionaryForm(data: any) {

    if (step + 1 > 2)
      return goToItemQuestionary()
    setStep(prevState => prevState + 1)
  }

  useEffect(() => {
    setQuestionData([{
      inputName: 'energyBill',
      titleQuestion: 'Questão 1',
      src: Coins,
      questionText: 'Quanto você paga na sua conta de energia?',
    },
    {
      inputName: 'residents',
      titleQuestion: 'Questão 2',
      src: Residents,
      questionText: 'Quantos moradores residem contando com você?',
    },
    {
      inputName: 'comforts',
      titleQuestion: 'Questão 3',
      src: Comfort,
      questionText: 'Quantos cômodos sua casa possui?',
    },

    ])
  }, [])

  function goToItemQuestionary() {
    navigation.navigate('questionaryItem')
  }

  useEffect(() => {


  }, [step])

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>

      <VStack flex={1} mt={12} px={8} pb={4}>

        {questionData.length > 0 &&

          <>
            <QuestionaryHeader
              titleQuestion={questionData[step]?.titleQuestion}
              srcImage={questionData[step]?.src}
              questionText={questionData[step]?.questionText}
              key={questionData[step]?.titleQuestion}
            />

            {step === 0 &&
              <Controller
                control={control}
                name={questionData[step]?.inputName}
                render={({ field: { onChange } }) => (
                  <MaskedTextInput
                    onChangeText={(text, rawText) => onChange(String(Number(rawText) / 100))}
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

        {questionData.length > 0 && step > 0 &&
          <Controller
            control={control}
            name="oi"
            render={({ field: { onChange } }) => (
              <InputQuestionary
                isRequired
                onChangeText={onChange}
                placeholder="Exemplo: 1"
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