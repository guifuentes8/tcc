import { Progress, Text, useTheme, VStack } from "native-base";

type Props = {
  percentage: number;
  title: string;
  textInsideProgressBar: string;
}

export function ProgressBar({ title, percentage, textInsideProgressBar }: Props) {

  const { colors } = useTheme()

  return (
    <VStack>
      <Text
        fontFamily="medium"
        fontSize="lg"
        color="green.100"
      >
        {title}
      </Text>
      <Progress
        mb={6}
        mt={1}
        bg="green.800"
        size="xl"
        _filledTrack={{ bg: colors.green[100], rounded: 12 }}
        value={percentage !== 0 ? percentage : 100}
      >
        <Text
          fontFamily="semibold"
          fontSize="md"
          color="green.900"
          position="absolute"
        >
          {percentage !== 0 ? textInsideProgressBar : 'Nenhum'}
        </Text>

      </Progress>
    </VStack>
  )
}