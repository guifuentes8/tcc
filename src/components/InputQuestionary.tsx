import { Input as NativeBaseInput, IInputProps, FormControl } from 'native-base';

type Props = IInputProps & {
  errorMessage?: string | null;
  isInvalid?: boolean;
};

export function InputQuestionary({ errorMessage = null, isInvalid = false, ...rest }: Props) {

  const invalid = !!errorMessage || isInvalid;

  return (
    <FormControl isInvalid={isInvalid}>

      <NativeBaseInput
        h={16}
        my={8}
        borderWidth={2}
        rounded="md"
        fontSize="xl"
        fontFamily="regular"
        borderColor="green.100"
        color={invalid ? "red.500" : "green.100"}
        placeholderTextColor="gray.400"
        isInvalid={invalid}
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

