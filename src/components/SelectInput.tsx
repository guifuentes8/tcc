import { useState } from "react";
import { Select } from "native-base";

type Props = {
  data: Array<{ id: string, name: string }>;
}

export function SelectInput({ data }: Props) {
  const [service, setService] = useState(data[0] ? data[0].id : '');

  return (
    <Select
      borderColor="green.100"
      color="green.100"
      fontFamily="semibold"
      borderWidth={3} rounded="lg"
      placeholderTextColor="gray.100"
      fontSize="xl"
      selectedValue={service}
      mb={6}
    >
      {data.map(item => <Select.Item label={item.name} value={item.id} />)}

    </Select>
  )
}