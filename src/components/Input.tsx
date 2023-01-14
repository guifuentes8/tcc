import { Input as NativeBaseInput, IInputProps, FormControl, Icon, Text } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons'

type Props = IInputProps & {
  errorMessage?: string | null;
  iconName?: string;
}

export function Input({ errorMessage = null, size = 12, isInvalid, iconName = '', ...rest }: Props) {

  const invalid = !!errorMessage || isInvalid;

  return (

    <FormControl isInvalid={invalid} mb={4}>
      <NativeBaseInput
        h={16}
        borderWidth={1}
        fontSize="md"
        fontFamily="regular"
        borderColor="green.100"
        color={invalid ? "red.500" : "green.100"}
        placeholderTextColor="gray.400"
        isInvalid={invalid}
        InputLeftElement={
          <Icon
            color={invalid ? "red.500" : "green.100"}
            as={MaterialIcons}
            name={iconName}
            size={6}
            ml={2}
          />
        }
        _invalid={{
          borderWidth: 1,
          borderColor: 'red.500',

        }}
        _focus={{
          bgColor: "green.800",
          borderColor: "green.100"
        }}
        {...rest}
      />
      <FormControl.ErrorMessage>
        <Text fontSize="sm" color="red.500">
          {errorMessage}
        </Text>
      </FormControl.ErrorMessage>
    </FormControl>
  )
}