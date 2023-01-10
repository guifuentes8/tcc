import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { Box, Center, Icon, Text } from "native-base";

import { MaterialIcons } from '@expo/vector-icons'

type Props = TouchableOpacityProps & {
  icon: keyof typeof MaterialIcons.glyphMap;
  action: string;
}

export function NextButton({ icon, action, ...rest }: Props) {
  return (
    <TouchableOpacity {...rest}>
      <Center>
        <Box rounded="full" borderColor="green.100" borderWidth={2} w={12} h={12} alignItems="center" justifyContent="center">
          <Icon color="green.100" size={8} as={MaterialIcons} name={icon} />
        </Box>
        <Text pt={2} color="green.100" fontFamily="audiowide" fontSize="lg">{action}</Text>
      </Center>
    </TouchableOpacity>
  )
}