import { QuestionaryHeader } from "@components/QuestionaryHeader";
import Coins from '@assets/coins.png'
import { Center, HStack, Text, VStack } from "native-base";
import { InputQuestionary } from "@components/InputQuestionary";
import { TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";

type QuestionProps = {
  titleQuestion: string;
  src: ImageData;
  questionText: string;
  itemText?: string;
}

export function Questionary() {

  const [step, setStep] = useState(0);

  const [questionData, setQuestionData] = useState<QuestionProps[]>([])

  useEffect(() => {
    setQuestionData([{
      titleQuestion: 'Questão 1',
      src: Coins,
      questionText: 'Quanto você paga na sua conta de energia?',
      itemText: ''
    },
    {
      titleQuestion: 'Questão 2',
      src: Coins,
      questionText: 'Quanto você paga na sua conta de energia?',
      itemText: ''
    }])
  }, [])

  return (
    <VStack flex={1} mt={12} px={8}>
      <QuestionaryHeader
        titleQuestion={questionData[step]?.titleQuestion}
        source={questionData[step]?.src}
        questionText={questionData[step]?.questionText}
        itemText={questionData[step]?.itemText}
      />

      <InputQuestionary
        masked="currency"
        onChangeText={() => { }}
      />

      <HStack>
        <TouchableOpacity onPress={() => setStep(step + 1)}>
          <Text>
            Próximo
          </Text>
        </TouchableOpacity>
      </HStack>
    </VStack>
  )
}