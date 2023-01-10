import { StyleSheet } from "react-native";
import { Input as NativeBaseInput, IInputProps, FormControl } from 'native-base';


import { MaskedTextInput, MaskedTextInputProps } from "react-native-mask-text";

type Props = MaskedTextInputProps & IInputProps & {
  errorMessage?: string | null;
  isInvalid?: boolean;
  masked?: string;

};

export function InputQuestionary({ errorMessage = null, isInvalid = false, masked = '', ...rest }: Props) {

  const invalid = !!errorMessage || isInvalid;

  return (
    <FormControl isInvalid={isInvalid}>
      {masked === 'currency' ?
        <MaskedTextInput
          type="currency"
          options={{
            prefix: 'R$ ',
            decimalSeparator: ',',
            groupSeparator: '.',
            precision: 2
          }}
          keyboardType="numeric"
          style={styles.input}
          {...rest}
        />
        :
        <NativeBaseInput
          h={14}
          my={3}
          borderWidth={2}
          fontSize="sm"
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
      }

      <FormControl.ErrorMessage>
        {errorMessage}
      </FormControl.ErrorMessage>
    </FormControl>
  )
}

const styles = StyleSheet.create({
  input: {
    marginTop: 32,
    height: 64,
    borderWidth: 2,
    borderRadius: 6,
    paddingLeft: 16,
    fontSize: 24,
    fontFamily: "Inter_600SemiBold",
    color: '#00FFA3',
    borderColor: '#00FFA3'
  },
});
