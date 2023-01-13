
import { Center, Text, VStack, Image, IImageProps } from 'native-base'
import { JSXElementConstructor } from 'react';

type Props = IImageProps & {
  title?: string;
  image?: boolean;
}

export function HeaderWelcome({ title = '', image = false, ...rest }: Props) {
  return (
    <VStack>
      <Center>
        <Text fontSize="xl" color="green.100" fontFamily="audiowide" mb={4}>
          {title}
        </Text>
        {image && <Image {...rest} />}
      </Center>
    </VStack >
  )
}