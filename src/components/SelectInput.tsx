import { useState } from "react";
import { ISelectProps, Select } from "native-base";

type Props = ISelectProps & {
  data: Array<{ id: string, name: string }>;
}

export function SelectInput({ data, ...rest }: Props) {

  return (
    <Select
      borderColor="green.100"
      color="green.100"
      fontFamily="semibold"
      borderWidth={3} rounded="lg"
      placeholderTextColor="gray.100"
      fontSize="xl"
      mb={6}
      {...rest}
    >
      {data.map(item => <Select.Item key={item.id} label={item.name} value={item.id} />)}

    </Select>
  )
}