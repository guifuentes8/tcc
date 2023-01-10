import { Input as NativeBaseInput, IInputProps, FormControl, Icon } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons'

type Props = IInputProps & {
  errorMessage?: string | null;
  iconName?: string;
}

export function Input({ errorMessage = null, size = 12, isInvalid, iconName = '', ...rest }: Props) {

  const invalid = !!errorMessage || isInvalid;

  return (

    <FormControl isInvalid={isInvalid}>
      <NativeBaseInput
        h={12}
        my={3}
        borderWidth={1}
        fontSize="sm"
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
          borderWidth: 2,
          borderColor: 'red.700'
        }}
        _focus={{
          bgColor: "green.800",
          borderColor: "green.100"
        }}
        {...rest}
      />
      <FormControl.ErrorMessage>
        {errorMessage}
      </FormControl.ErrorMessage>
    </FormControl>
  )
}