import { api } from "@services/api";
import { HStack, IImageProps, Image, Text, VStack } from "native-base";
import { ImageURISource, TouchableOpacity, TouchableOpacityProps } from "react-native";
import { CircularProgressBar } from "./CircularProgress";

type Props = TouchableOpacityProps & {
  image: string,
  itemPercentage: number;
  itemName: string;
}

export function EconomizeCard({ image, itemPercentage, itemName, ...rest }: Props) {
  return (
    <TouchableOpacity {...rest}>
      <HStack justifyContent="space-between" bg="green.800" w="full" h={20} px={4} py={2} my={2} rounded="md">
        <HStack alignItems="center">
          <Image
            w={12}
            h={12}
            alt="Foto item"
            source={{ uri: `${api.defaults.baseURL}/items/thumb/${image}` }}
          />
          <VStack ml={3}>
            <Text fontFamily="regular" fontSize="sm" color="green.100">Item:</Text>
            <Text fontFamily="semibold" fontSize="md" color="green.100">{itemName}</Text>
          </VStack>
        </HStack>

        <CircularProgressBar maxValue={100} radius={30} title="" valueSuffix="%" circularProgressValue={itemPercentage} bgChange strokeSize={4} />
      </HStack>
    </TouchableOpacity>
  )
}