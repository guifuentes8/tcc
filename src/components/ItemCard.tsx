import { api } from "@services/api";
import { Box, Image, Text } from "native-base";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";

type Props = TouchableOpacityProps & {
  image: string;
}

export function ItemCard({ image, ...rest }: Props) {
  return (
    <TouchableOpacity {...rest}>
      <Box
        rounded="xl"
        bg="green.800"
        w={24}
        h={24}
        justifyContent="center"
        alignItems="center"
        mx={1}
        mt={2}
      >
        <Image
          w={20}
          h={20}
          alt="Foto item"
          source={{ uri: `${api.defaults.baseURL}/items/thumb/${image}` }}
        />
      </Box>
    </TouchableOpacity>
  )
}