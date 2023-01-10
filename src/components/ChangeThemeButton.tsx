import { TouchableOpacity } from "react-native";

import { MoonStars } from 'phosphor-react-native'
import { useTheme } from "native-base";
import { useEffect } from "react";

export function ChangeThemeButton() {

  const { colors } = useTheme();

  useEffect(() => {
  }, [])

  return (
    <TouchableOpacity onPress={() => { }}>
      <MoonStars color={colors.primary[100]} size={28} />
    </TouchableOpacity>
  )
}