import { Slider, Text, HStack, ISliderProps } from "native-base";

type Props = ISliderProps & {
  min: number;
  max: number;
  myValue: number;
}

export function SliderRange({ min, max, myValue, ...rest }: Props) {


  return (
    <>
      <HStack justifyContent="space-between">
        <Text color={myValue === min ? "green.100" : "gray.100"} fontSize="lg" ml={-2} fontFamily="medium">{min}</Text>
        <Text color={myValue === max ? "green.100" : "gray.100"} fontSize="lg" mr={-2} fontFamily="medium">{max}</Text>
      </HStack>
      <Slider minValue={min} maxValue={max} {...rest} >
        <Slider.Track bg="gray.100">
          <Slider.FilledTrack bg="green.100" />
        </Slider.Track>
        <Slider.Thumb
          bg="green.100"
        >
          {(myValue !== min && myValue !== max) &&
            <Text w={8} color="green.100" fontSize="md" fontFamily="medium" position="absolute" top={3} left={0} right={0}>{myValue}</Text>
          }
        </Slider.Thumb>
      </Slider>


    </>

  )
}