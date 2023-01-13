import LogoSvg from '@assets/logo.svg'

import { Center, Text, VStack } from 'native-base'

type Props = {
  title?: string;
}

export function Header({ title = '', }: Props) {
  return (
    <VStack>
      <Center>
        <LogoSvg />
        <Text fontSize="lg" color="green.100" fontFamily="audiowide" mt={4}>
          {title.toUpperCase()}
        </Text>
      </Center>
    </VStack >
  )
}