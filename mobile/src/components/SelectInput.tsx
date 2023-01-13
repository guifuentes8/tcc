import { useState } from "react";
import { Select } from "native-base";


export function SelectInput() {
  const [service, setService] = useState("ux");

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
      <Select.Item label="UX Research" value="ux" />
      <Select.Item label="Web Development" value="web" />
      <Select.Item label="Cross Platform Development" value="cross" />
    </Select>
  )
}