import { Box, Image, Text } from "native-base";
import { TouchableOpacity } from "react-native";

type Props = {
  itemName: string;
}

export function ItemCard({ itemName }: Props) {
  return (
    <TouchableOpacity>
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
          w={16}
          h={16}
          alt="Foto item"
          source={{ uri: 'https://github.com/guifuentes8.png' }}
        />
      </Box>
    </TouchableOpacity>
  )
}