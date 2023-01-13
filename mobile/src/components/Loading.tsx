import { Spinner, Center } from "native-base"

export function Loading() {
  return (
    <Center flex={1} bg='green.900'>
      <Spinner color="green.100" />
    </Center>
  )
}