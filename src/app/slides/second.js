import { Pressable, Text, View, StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';
import { useSharedValue, withSpring } from 'react-native-reanimated';
import CodePreview from '../components/CodePreview';
import Card from '../components/Card';

export default function Second() {
  const width = useSharedValue(100);

  const handlePress = () => {
    width.value = withSpring(Math.random() * 100 + 100);
  };

  const jsCode = `import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';

const width = useSharedValue(100);

const handlePress = () => {
  width.value = withSpring(Math.random() * 100 + 100);
};

return (
  <Animated.View style={{ width, height: 100 }} />
  <Pressable onPress={handlePress}>
    <Text>ANIMAR</Text>
  </Pressable>
);`

  return (
    <View className="flex-1">
      <View className="mb-12">
        <Text className="text-white font-poppins-semibold text-5xl block">Primeira <Text className="text-primary">animação!</Text></Text>
      </View>

      <View className='flex flex-1 flex-row gap-6'>
        <View className="flex flex-col gap-6 flex-1">
          <Card>
            <Text className="text-xl text-white font-poppins-semibold mb-2">Animated</Text>
            <Text className="text-xl text-gray-400 font-poppins mb-2">Objeto do Reanimated responsável por criar elementos animáveis. São componentes padrões do React Native, adaptados pra receber animações do Reanimated.</Text>

            <View className="rounded-lg border border-gray-800 bg-black/40 p-4 ">
              <Text className="font-jet-brains text-sm text-white text-lg">{`<Animated.View /> <Animated.Image /> <Animated.FlatList />`}</Text>
            </View>
          </Card>
          
          <Card>
            <Text className="text-xl text-white font-poppins-semibold mb-2">useSharedValue</Text>
            <Text className="text-xl text-gray-400 font-poppins mb-2">É um hook do Reanimated, responsável por criar uma variável que pode ser acessado por componentes Animated.</Text>
          
            <View className="rounded-lg border border-gray-800 bg-black/40 p-4">
              <Text className="font-jet-brains text-sm text-white text-lg">{`const num = useSharedValue(100)\nwidth.value = 50`}</Text>
            </View>
          </Card>
        </View>

        <View className="flex-row gap-6 flex-1">
          <CodePreview
            jsCode={jsCode}
          >
            <View style={styles.previewContent}>
              <Animated.View style={[styles.box, { width }]} />
              <Pressable onPress={handlePress} style={styles.previewButton}>
                <Text style={styles.previewButtonText}>ANIMAR</Text>
              </Pressable>
            </View>
          </CodePreview>
        </View>
      </View>
    </View>

  );
}

const styles = StyleSheet.create({
  previewContent: {
    alignItems: 'center',
    gap: 16,
  },
  box: {
    height: 100,
    borderRadius: 20,
    backgroundColor: 'rgb(14, 212, 246)'
  },
  previewButton: {
    minWidth: 76,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 2,
    backgroundColor: '#2196f3',
    paddingHorizontal: 10,
  },
  previewButtonText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '700',
  },
});
