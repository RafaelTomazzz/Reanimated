import Animated, {
  useSharedValue,
  withTiming,
  withRepeat,
  useAnimatedStyle,
  withSequence,
} from 'react-native-reanimated';
import { View, Button, StyleSheet, Text } from 'react-native';
import React from 'react';
import WithSpringPlayground from '../components/WithSpringPlayground';
import Card from '../components/Card';

export default function Fifth() {

  return (
    <View className="flex-1">
      <View className="mb-12">
        <Text className="text-white font-poppins-semibold text-5xl block">withSpring</Text>
      </View>

      <View className='flex flex-1 flex-row gap-6'>
        <View className="flex flex-col gap-6 flex-1">
          <Card>
            <Text className="text-xl text-white font-poppins-semibold mb-2">O que é withSpring?</Text>
            <Text className="text-xl text-gray-400 font-poppins">Função para criar uma animação baseada em conceitos da física. Faz parecer que o componente esta conectado a uma mola.</Text>
          </Card>

          <Card>
            <Text className="text-xl text-white font-poppins-semibold mb-2">Mass - massa</Text>
            <Text className="text-xl text-gray-400 font-poppins">Peso do objeto preso a mola. Maior - demora mais para acelerar e mais para parar. Menor - reage rápido, mais leve.</Text>
          </Card>

          <Card>
            <Text className="text-xl text-white font-poppins-semibold mb-2">Stiffness - rigidez</Text>
            <Text className="text-xl text-gray-400 font-poppins">É o quão forte a mola é. Maior - mais rápida e seca a animação. Menor - animação lenta "preguiçosa"</Text>
          </Card>
          
          <Card>
            <Text className="text-xl text-white font-poppins-semibold mb-2">Damping - amortecimento</Text>
            <Text className="text-xl text-gray-400 font-poppins">Controla se o objeto balança ou não ao final da animação. </Text>
          </Card>
        </View>

        <View className="flex flex-col gap-6 flex-1">
          <WithSpringPlayground/>
        </View>
      </View>
    </View>
  );
}
