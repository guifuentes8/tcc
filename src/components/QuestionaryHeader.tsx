import { api } from "@services/api";
import { Center, Image, Text, VStack } from "native-base";
import { ImageURISource } from "react-native";

type Props = {
  titleQuestion: string;
  srcPath?: string;
  srcImage?: ImageURISource;
  questionText?: string;
  itemText?: string;
}

export function QuestionaryHeader({ titleQuestion, srcPath = '', srcImage = undefined, questionText = '', itemText = '' }: Props) {

  return (
    <VStack>
      <Center mb={4}>
        <Text
          fontFamily="audiowide"
          fontSize="xl"
          color="green.100"
        >
          {titleQuestion}
        </Text>

        {srcPath.length > 0 &&
          <Image
            mt={4}
            alt="foto"
            h={24}
            w={24}
            source={{ uri: `${api.defaults.baseURL}/items/thumb/${srcPath}` }}
            resizeMode="cover"
          />
        }

        {srcPath.length === 0 &&
          <Image
            mt={4}
            alt="foto"
            h={24}
            w={24}
            source={srcImage}
            resizeMode="cover"
          />
        }


        {itemText && <Text
          fontFamily="semibold"
          fontSize="lg"
          color="white"
          mt={4}
        >
          {itemText}
        </Text>}
      </Center>


      {questionText && <Text
        fontFamily="medium"
        fontSize="32px"
        color="green.100"
        mb={6}
      >
        {questionText}
      </Text>
      }


    </VStack>
  )
}