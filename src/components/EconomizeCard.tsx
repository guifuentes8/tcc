import { HStack, Image, Text, VStack } from "native-base";
import { TouchableOpacity } from "react-native";
import { CircularProgressBar } from "./CircularProgress";

export function EconomizeCard() {
  return (
    <TouchableOpacity>
      <HStack justifyContent="space-between" bg="green.800" w="full" h={20} px={4} py={2} my={2} rounded="md">
        <HStack alignItems="center">
          <Image
            w={12}
            h={12}
            alt="Foto item"
            source={{ uri: 'https://github.com/guifuentes8.png' }}
          />
          <VStack ml={3}>
            <Text fontFamily="regular" fontSize="sm" color="green.100">Item:</Text>
            <Text fontFamily="semibold" fontSize="md" color="green.100">Geladeira</Text>
          </VStack>
        </HStack>

        <CircularProgressBar maxValue={100} radius={30} title="" circularProgressValue={30} strokeSize={4} />
      </HStack>
    </TouchableOpacity>
  )
}