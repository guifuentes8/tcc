import { Box, Button as ButtonNativeBase, Center, IButtonProps, IInputProps, Text } from 'native-base';
import { Loading } from './Loading';

type Props = IButtonProps & {
  title: string;
  upperCase?: boolean;
  selected?: boolean;
}

export function Button({ title, isLoading, selected = true, fontSize = 'xl', upperCase = false, ...rest }: Props) {
  return (
    <>

      {isLoading && <ButtonNativeBase
        w="full"
        h={14}
        bg="green.900"
        _pressed={
          {
            bg: "green.200"
          }
        }
        {...rest}
      >
        <Center>
          <Loading />
        </Center>
      </ButtonNativeBase>}

      {
        !isLoading &&
        <ButtonNativeBase
          w="full"
          h={14}
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
              fontSize={fontSize}
            >
              {upperCase ? title.toLocaleUpperCase() : title}
            </Text>
          </Center>
        </ButtonNativeBase>
      }
    </>
  )
}