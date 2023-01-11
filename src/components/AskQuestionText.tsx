import { Text, ITextProps } from "native-base";

type Props = ITextProps & {
  question: string;
}

export function AskQuestionText({ question }: Props) {
  return (
    <Text fontFamily="medium" fontSize="md" color="green.100">{question}</Text>
  )
}