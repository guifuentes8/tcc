import { Box, Center, HStack, Text, VStack } from "native-base";

export function Dashboard() {
  return (
    <VStack flex={1} mt={12} px={8}>
      <Center >
        <Text>
          Guilherme Fuentes
        </Text>
      </Center >


      <VStack flex={1} mt={32}>
        <Center>
          <Text mb={4}>Energia consumida</Text>
          <Box w={64} h={64} borderWidth={5} rounded="full" borderColor="gray.100" />
          <HStack justifyContent="space-between" mt={8}>
            <VStack>
              <Text>Item que mais consome</Text>
              <Box mr={12} w={32} h={32} borderWidth={5} rounded="full" borderColor="gray.100" />
            </VStack>
            <Box w={32} h={32} borderWidth={5} rounded="full" borderColor="gray.100" />

          </HStack>

        </Center>
      </VStack>

    </VStack >
  )
}