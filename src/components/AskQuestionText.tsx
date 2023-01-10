import { Text, ITextProps } from "native-base";

type Props = ITextProps & {
  question: string;
}

export function AskQuestionText({ question }: Props) {
  return (
    <Text fontFamily="regular" fontSize="sm" color="green.100" mb={2}>{question}</Text>
  )
}