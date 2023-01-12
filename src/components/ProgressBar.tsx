import { Progress, Text, useTheme, VStack } from "native-base";

type Props = {
  percentage: number;
  nameUser: string;
}

export function ProgressBar({ nameUser, percentage }: Props) {

  const { colors } = useTheme()

  return (
    <VStack>
      <Text
        fontFamily="medium"
        fontSize="lg"
        color="green.100"
      >
        Usuário: {nameUser}
      </Text>
      <Progress
        my={6}
        bg="green.800"
        size="lg"
        _filledTrack={{ bg: colors.green[100], rounded: 12 }}
        value={percentage}
      />
    </VStack>
  )
}