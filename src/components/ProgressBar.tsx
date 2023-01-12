import { Progress, Text, useTheme, VStack } from "native-base";

type Props = {
  percentage: number;
  title: string;
}

export function ProgressBar({ title, percentage }: Props) {

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
        size="lg"
        _filledTrack={{ bg: colors.green[100], rounded: 12 }}
        value={percentage}
      />
    </VStack>
  )
}