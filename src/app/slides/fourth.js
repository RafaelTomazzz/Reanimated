import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  withRepeat,
} from 'react-native-reanimated';
import WithTimingPlayground from '../components/WithTimingPlayground';
import Card from '../components/Card';

const duration = 3000;

export default function Fourth({ width = 1000 }) {
  const defaultAnim = useSharedValue(width / 2 - 160);
  const linear = useSharedValue(width / 2 - 160);

  const animatedDefault = useAnimatedStyle(() => ({
    transform: [{ translateX: defaultAnim.value }],
  }));
  const animatedChanged = useAnimatedStyle(() => ({
    transform: [{ translateX: linear.value }],
  }));

  React.useEffect(() => {
    linear.value = withRepeat(
      // highlight-next-line
      withTiming(-linear.value, {
        duration,
        easing: Easing.linear,
      }),
      -1,
      true
    );
    defaultAnim.value = withRepeat(
      // highlight-next-line
      withTiming(-defaultAnim.value, {
        duration,
      }),
      -1,
      true
    );
  }, []);

  return (
    <View className="flex-1">
      <View className="mb-12">
        <Text className="text-white font-poppins-semibold text-5xl block">withTiming?</Text>
      </View>

      <View className='flex flex-1 flex-row gap-6'>
        <View className="flex flex-col gap-6 flex-1">
          <Card>
            <Text className="text-xl text-white font-poppins-semibold mb-2">O que é withTiming</Text>
            <Text className="text-xl text-gray-400 font-poppins">Função para criar uma animação baseada em tempo. Atualiza o valor gradualmente.</Text>
          </Card>
          
          <Card>
            <Text className="text-xl text-white font-poppins-semibold mb-2">During</Text>
            <Text className="text-xl text-gray-400 font-poppins">Define o tempo de duração da animação.</Text>
          </Card>
          
          <Card>
            <Text className="text-xl text-white font-poppins-semibold mb-2">Easing</Text>
            <Text className="text-xl text-gray-400 font-poppins">Controla a velocidade da animação ao longo do tempo.</Text>
          </Card>
        </View>

        <View className="flex flex-col gap-6 flex-1">
          <WithTimingPlayground></WithTimingPlayground>
        </View>
      </View>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  box: {
    height: 80,
    width: 80,
    margin: 20,
    borderWidth: 1,
    borderColor: '#b58df1',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#b58df1',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
});
