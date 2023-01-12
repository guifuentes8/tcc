import { Image, Text, useTheme, View, VStack } from "native-base";
import { ReactNode } from "react";
import { ImageSourcePropType } from "react-native";
import CircularProgress, { CircularProgressBase } from 'react-native-circular-progress-indicator';
import { CircularProgressBaseProps } from "react-native-circular-progress-indicator/lib/typescript/types";

type Props = {
  radius: number;
  strokeSize: number;
  circularProgressValue?: number;
  sourceImg?: ImageSourcePropType;
  title?: string;
  maxValue?: number;
  value?: number;
  children?: ReactNode;
  valuePrefix?: string;
  valueSuffix?: string;
}

export function CircularProgressBar({
  children,
  value = 100,
  valuePrefix = '',
  valueSuffix = '',
  title = 'Kwh/mês',
  strokeSize,
  radius = 80,
  maxValue,
  sourceImg = undefined,
  circularProgressValue = 0,
  ...rest
}: Props) {

  const { colors } = useTheme()

  const size = radius / 1.3

  return (
    <CircularProgressBase
      value={value}
      maxValue={maxValue}
      radius={radius}
      duration={2000}
      activeStrokeWidth={circularProgressValue !== 0 ? 0 : strokeSize}
      activeStrokeColor={colors.green[100]}
      inActiveStrokeWidth={circularProgressValue !== 0 ? 0 : strokeSize}
      inActiveStrokeColor={colors.green[800]}
      {...rest}
    >

      {circularProgressValue !== 0 &&
        <CircularProgress
          radius={radius}
          maxValue={maxValue}
          value={circularProgressValue}
          valuePrefix={valuePrefix}
          valueSuffix={valueSuffix}
          duration={2000}
          activeStrokeWidth={strokeSize}
          activeStrokeColor={colors.green[100]}
          inActiveStrokeWidth={strokeSize}
          inActiveStrokeColor={colors.green[800]}
          progressValueColor={colors.green[100]}
          titleColor={colors.green[100]}
          title={title}
          titleStyle={{ fontFamily: 'Audiowide_400Regular' }}
        />
      }
      {circularProgressValue === 0 &&
        <VStack alignItems="center">
          {sourceImg && <Image
            w={size}
            h={size}
            alt='Imagem do item'
            source={sourceImg}
          />
          }
          <Text textAlign="center" color="green.100" fontSize={`${radius / 4}px`} fontFamily="medium">
            {children}
          </Text>
        </VStack>
      }
    </CircularProgressBase>
  )
}