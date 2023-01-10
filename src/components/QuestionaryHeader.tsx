import { Center, IImageProps, Image, Text, VStack } from "native-base";

type Props = IImageProps & {
  titleQuestion: string;
  questionText?: string;
  itemText?: string;
}

export function QuestionaryHeader({ titleQuestion, questionText = '', itemText = '', ...rest }: Props) {
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
        h={32}
        w={32}
        {...rest}
      />

      {itemText && <Text
        fontFamily="semibold"
        fontSize="lg"
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