import { Button as ButtonNativeBase, Center, IButtonProps, IInputProps, Text } from 'native-base';

type Props = IButtonProps & {
  title: string;
  upperCase?: boolean;
  selected?: boolean;
}

export function Button({ title, selected = true, upperCase = false, ...rest }: Props) {
  return (
    <ButtonNativeBase
      w="full"
      h={12}
      bg={selected ? 'green.100' : 'gray.100'}
      _pressed={
        {
          bg: "green.200"
        }
      }
      {...rest}
    >
      <Center>
        <Text
          color="green.900"
          fontFamily="audiowide"
          fontSize="lg"
        >
          {upperCase ? title.toLocaleUpperCase() : title}
        </Text>
      </Center>
    </ButtonNativeBase>
  )
}