import React, { useRef, useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import Animated, {
  Easing,
  ReduceMotion,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const BOX = 72;
const FUNCTIONS = ['linear', 'ease', 'quad', 'cubic', 'bounce'];

function getEasing(mode = 'in', fn) {
  if (fn === 'linear') return Easing.linear;
  if (fn === 'ease') return Easing.ease;
  return Easing[mode](Easing[fn]);
}

function Chip({ label, active, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.chip, active && styles.chipActive]}
    >
      <Text style={[styles.chipText, active && styles.chipTextActive]} className="font-poppins text-md">
        {label}
      </Text>
    </Pressable>
  );
}

export default function WithTimingPlayground() {
  const [duration, setDuration] = useState('1000');
  const [mode, setMode] = useState('in');
  const [fn, setFn] = useState('quad');
  const [trackWidth, setTrackWidth] = useState(0);

  const x = useSharedValue(0);
  const atEnd = useRef(false);

  const ms = parseInt(duration, 10) || 0;

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: x.value }],
  }));

  const play = () => {
    const target = atEnd.current ? 0 : Math.max(0, trackWidth - BOX);
    atEnd.current = !atEnd.current;

    x.value = withTiming(target, {
      duration: ms,
      easing: getEasing(mode, fn),
      reduceMotion: ReduceMotion.Never,
    });
  };

  const easingCode =
    fn === 'linear'
      ? 'Easing.linear'
      : fn === 'ease'
      ? 'Easing.ease'
      : `Easing.${mode}(Easing.${fn})`;

  return (
    <View className="border border-gray-800 bg-background" style={styles.container}>
      <View
        style={styles.track} className="border border-gray-800 bg-black/40 p-4"
        onLayout={(e) => setTrackWidth(e.nativeEvent.layout.width - 32)}
      >
        <Animated.View style={[styles.box, animatedStyle]} />
      </View>

      <Pressable onPress={play} style={styles.playButton}>
        <Text className="text-white text-sm font-poppins" style={styles.playText}>Animar</Text>
      </Pressable>

      <Text style={styles.label} className="text-gray-400 font-poppins text-lg">Duração (ms)</Text>
      <TextInput
        value={duration}
        onChangeText={(t) => setDuration(t.replace(/[^0-9]/g, ''))}
        keyboardType="numeric"
        style={styles.input}
        className="border border-gray-400 text-gray-400 font-poppins"
      />

      <Text style={styles.label} className="text-gray-400 font-poppins text-lg">Easing</Text>
      <View style={styles.row}>
        {FUNCTIONS.map((f) => (
          <Chip key={f} label={f} active={fn === f} onPress={() => setFn(f)} />
        ))}
      </View>

      <View style={styles.codeBox} className="border border-gray-800 bg-black/40">
        <Text style={styles.code} className="text-white font-jet-brains text-lg ">
          {`withTiming(sv.value, {\n  duration: ${ms},\n  easing: ${easingCode},\n})`}
        </Text>
      </View>
    </View>
  );
}

const PURPLE = '#7c3aed';

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderRadius: 12,
  },
  track: {
    height: BOX + 24,
    justifyContent: 'center',
    borderRadius: 12,
    overflow: 'hidden',
  },
  box: {
    width: BOX,
    height: BOX,
    borderRadius: 18,
    backgroundColor: 'rgb(14, 212, 246)',
  },
  playButton: {
    alignSelf: 'flex-start',
    marginTop: 16,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: 'rgba(14, 168, 196, 1)'
  },
  playText: { color: '#fff', fontWeight: '600' },
  label: {
    marginTop: 18,
    marginBottom: 6,
    fontSize: 15,
    fontWeight: '600',
    color: '#1e1b4b',
  },
  input: {
    borderWidth: 1,
    borderColor: '#1e1b4b',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 8,
    width: 110,
    color: '#1e1b4b',
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 8,
  },
  chip: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 999,
    backgroundColor: '#fff',
  },
  chipActive: { backgroundColor: 'rgba(14, 168, 196, 1)', borderColor: PURPLE },
  chipText: { color: '#1e1b4b' },
  chipTextActive: { color: '#fff', fontWeight: '600' },
  codeBox: {
    marginTop: 20,
    padding: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#c9c4e6',
    backgroundColor: '#fff',
  },
  code: { fontFamily: 'monospace', fontSize: 13, color: '#1e1b4b' },
});
