import { View, Button, StyleSheet, Text } from 'react-native';
import Animated, { useSharedValue, withSpring, useAnimatedStyle, useAnimatedProps, withTiming } from 'react-native-reanimated';
import { Circle, Svg } from 'react-native-svg';
import CodePreview from '../components/CodePreview';
import Card from '../components/Card';

export default function Third() {
  const jsCodeStyle = `const translateX = useSharedValue(0);
  
  const handlePress = () => {
    translateX.value += 50
  };
  
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: withSpring(translateX.value) }],
  }));
  
  return (
    <View style={styles.container}>
      <Animated.View style={[styles.box, animatedStyle]} />
    </View>
    <Button className='mt-4' onPress={handlePress} title="Click me" />
  );`

  const translateX = useSharedValue(0);

  const handlePress = () => {
    translateX.value += 50
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: withSpring(translateX.value) }],
  }));

  const jsCodeProps = `const AnimatedCircle = Animated.createAnimatedComponent(Circle);
  
  const radius = useSharedValue(50);
  
  const handleRadiusPress = () => {
    radius.value += 10;
  }

  const animatedRadius = useAnimatedProps(() => ({
    r: withTiming(radius.value)
  }))
    
  return (
    <Svg width={180} height={180}>
      <AnimatedCircle
        cx="50%"
        cy="50%"
        animatedProps={animatedRadius}
        fill='rgb(14, 212, 246)'
      />
    </Svg>
    <Button className='mt-4' title="Click me" onPress={handleRadiusPress} />
  );`

  const AnimatedCircle = Animated.createAnimatedComponent(Circle);

  const radius = useSharedValue(50);

  const handleRadiusPress = () => {
    radius.value += 10;
  }

  const animatedRadius = useAnimatedProps(() => ({
    r: withTiming(radius.value)
  }))

  return (

    <View className="flex-1">

      <View className="mb-6">
        <Text className="text-white font-poppins-semibold text-5xl block">useAnimatedStyle e useAnimatedProps</Text>
      </View>

      <View className='flex flex-1 flex-row gap-6'>
        <View className="flex flex-col gap-6 flex-1">
          <Card>
            <Text className="text-xl text-white font-poppins-semibold mb-2">useAnimatedStyles</Text>
            <Text className="text-xl text-gray-400 font-poppins mb-2">
              Cria um objeto de estilos, semelhante ao StyleSheet, que é recalculado automaticamente quando algum SharedValue usado dentro dele muda. É executado diretamente no ambiente de UI.
            </Text>
          </Card>
          
          <Card>
            <Text className="text-xl text-white font-poppins-semibold mb-2">useAnimatedProps</Text>
            <Text className="text-xl text-gray-400 font-poppins mb-2">
              Semelhante ao AnimatedStyles, contudo é aplicado a os props de um elemento.
            </Text>
          </Card>
          
          <Card>
            <Text className="text-xl text-white font-poppins-semibold mb-2">JS Thread</Text>
            <Text className="text-xl text-gray-400 font-poppins mb-2">
              É onde roda o seu código JavaScript: componentes React, useState, useEffect, chamadas de API, lógica de negócio, handlers de onPress.
            </Text>
          </Card>
          
          <Card>
            <Text className="text-xl text-white font-poppins-semibold mb-2">UI Thread</Text>
            <Text className="text-xl text-gray-400 font-poppins mb-2">
              É a thread nativa (Android/iOS) responsável por desenhar a tela, processar toques e rodar as animações do sistema.
            </Text>
          </Card>
        </View>

        <View className="flex flex-col gap-1 flex-1">
          <CodePreview jsCode={jsCodeStyle}>
            <View style={styles.container}>
              <Animated.View style={[styles.box, animatedStyle]} />
            </View>
            <Button className='mt-4' onPress={handlePress} title="ANIMAR" />
          </CodePreview>

          <CodePreview jsCode={jsCodeProps}>
            <View className='flex items-center justify-center' style={styles.container}>
              <Svg width={180} height={180}>
                <AnimatedCircle
                  cx="50%"
                  cy="50%"
                  animatedProps={animatedRadius}
                  fill='rgb(14, 212, 246)'
                />
              </Svg>
              <Button className='mt-4' title="ANIMAR" onPress={handleRadiusPress} />
            </View>
          </CodePreview>

        </View>
      </View>

    </View>
  );

}

const styles = StyleSheet.create({
  box: {
    width: 100,
    height: 100,
    backgroundColor: 'rgb(14, 212, 246)',
  },
  container: {
    padding: 20,
    width: 500
  }
})

