import { Slider, Text, HStack, ISliderProps } from "native-base";

type Props = ISliderProps & {
  min: number;
  max: number;
}

export function SliderRange({ min, max, value, ...rest }: Props) {


  return (
    <>

      <Slider minValue={min} maxValue={max} {...rest} >
        <Slider.Track bg="gray.100">
          <Slider.FilledTrack bg="green.100" />
        </Slider.Track>
        <Slider.Thumb
          bg="green.100"
        >
          {(value !== min && value !== max) &&
            <Text w={8} color="green.100" fontSize="md" fontFamily="medium" position="absolute" top={3} left={0} right={0}>{value}</Text>
          }
        </Slider.Thumb>

      </Slider>
      <HStack mb={4} flex={1} justifyContent="space-between">
        <Text color="green.100" fontSize="md" fontFamily="medium">{min}</Text>
        <Text color="green.100" fontSize="md" fontFamily="medium">{max}</Text>
      </HStack>

    </>

  )
}