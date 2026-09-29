import { Pressable, Text, View, StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';
import { useSharedValue, withSpring } from 'react-native-reanimated';
import CodePreview from '../components/CodePreview';

export default function Second() {
  const width = useSharedValue(100);

  const handlePress = () => {
    width.value = withSpring(Math.random() * 100 + 50);
  };

  const handleReset = () => {
    width.value = withSpring(100);
  };

  return (
    <CodePreview
      onReset={handleReset}
      jsCode={`import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';

const width = useSharedValue(100);

const animate = () => {
  width.value = withSpring(Math.random() * 100 + 50);
};

<Animated.View style={{ width, height: 100 }} />`}
    >
      <View style={styles.previewContent}>
        <Animated.View style={[styles.box, { width }]} />
        <Pressable onPress={handlePress} style={styles.previewButton}>
          <Text style={styles.previewButtonText}>ANIMAR</Text>
        </Pressable>
      </View>
    </CodePreview>
  );
}

const styles = StyleSheet.create({
  previewContent: {
    alignItems: 'center',
    gap: 48,
  },
  box: {
    height: 100,
    borderRadius: 20,
    backgroundColor: '#b58df1',
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
