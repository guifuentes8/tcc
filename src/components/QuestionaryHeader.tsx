import { Center, Image, Text, VStack } from "native-base";
import { ImageSourcePropType } from "react-native";

type Props = {
  titleQuestion: string;
  srcImage: ImageSourcePropType;
  questionText?: string;
  itemText?: string;
}

export function QuestionaryHeader({ titleQuestion, srcImage, questionText = '', itemText = '' }: Props) {
  return (
    <VStack>
      <Text
        fontFamily="audiowide"
        fontSize="xl"
        color="green.100"
      >
        {titleQuestion}
      </Text>

      <Image
        mt={4}
        alt="foto"
        h={24}
        w={24}
        source={srcImage}
        resizeMode="cover"
      />

      {itemText && <Text
        fontFamily="semibold"
        fontSize="md"
        color="white"
        mb={4}
      >
        {itemText}
      </Text>}

      {questionText && <Text
        fontFamily="medium"
        fontSize="32px"
        color="green.100"
      >
        {questionText}
      </Text>
      }


    </VStack>
  )
}