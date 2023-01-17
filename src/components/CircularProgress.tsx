import { Image, Text, useTheme, View, VStack } from "native-base";
import { ReactNode } from "react";
import { ImageSourcePropType } from "react-native";
import CircularProgress, { CircularProgressBase } from 'react-native-circular-progress-indicator';

type Props = {
  radius: number;
  strokeSize: number;
  circularProgressValue?: number;
  isCircularProgress?: boolean;
  sourceImg?: ImageSourcePropType;
  title?: string;
  maxValue?: number;
  value?: number;
  children?: ReactNode;
  valuePrefix?: string;
  valueSuffix?: string;
  bgChange?: boolean;
  card?: boolean;
}

export function CircularProgressBar({
  children,
  card = false,
  bgChange = false,
  value = 100,
  valuePrefix = '',
  valueSuffix = '',
  title = 'Kwh/mês',
  strokeSize,
  radius = 80,
  maxValue,
  sourceImg = undefined,
  circularProgressValue = 0,
  isCircularProgress = true,
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
      activeStrokeWidth={isCircularProgress ? 0 : strokeSize}
      activeStrokeColor={colors.green[100]}
      inActiveStrokeWidth={isCircularProgress ? 0 : strokeSize}
      inActiveStrokeColor={colors.green[800]}
      {...rest}
    >
      {isCircularProgress &&
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
          inActiveStrokeColor={!bgChange ? colors.green[800] : colors.gray[500]}
          progressValueColor={colors.green[100]}
          titleColor={colors.green[100]}
          title={title}
          titleStyle={{ fontFamily: 'Audiowide_400Regular' }}
        />
      }
      {!isCircularProgress &&
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