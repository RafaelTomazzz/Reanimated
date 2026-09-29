import React, { useRef, useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import Animated, {
    Easing,
    ReduceMotion,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming,
} from 'react-native-reanimated';

const BOX = 72;

export default function WithSpringPlayground() {
    const [trackWidth, setTrackWidth] = useState(0);
    const [mass, setMass] = useState(50);
    const [stiffness, setStiffness] = useState(800);
    const [damping, setDamping] = useState(120);

    const x = useSharedValue(trackWidth);
    const atEnd = useRef(false);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: x.value }],
    }));

    const play = () => {
        const target = atEnd.current ? 0 : Math.max(0, trackWidth - BOX);
        atEnd.current = !atEnd.current;

        x.value = withSpring(target, {
            mass: mass,
            stiffness: stiffness,
            damping: damping
        })
    }

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

            <View className="flex flex-row gap-4">
                <View>
                    <Text style={styles.label} className="text-gray-400 font-poppins text-lg">Mass</Text>
                    <TextInput
                        value={mass}
                        onChangeText={(t) => setMass(t.replace(/[^0-9]/g, ''))}
                        keyboardType="numeric"
                        style={styles.input}
                        className="border border-gray-400 text-gray-400 font-poppins"
                    />
                </View>
                
                <View>
                    <Text style={styles.label} className="text-gray-400 font-poppins text-lg">Stiffness</Text>
                    <TextInput
                        value={stiffness}
                        onChangeText={(t) => setStiffness(t.replace(/[^0-9]/g, ''))}
                        keyboardType="numeric"
                        style={styles.input}
                        className="border border-gray-400 text-gray-400 font-poppins"
                    />
                </View>
                
                <View>
                    <Text style={styles.label} className="text-gray-400 font-poppins text-lg">Damping</Text>
                    <TextInput
                        value={damping}
                        onChangeText={(t) => setDamping(t.replace(/[^0-9]/g, ''))}
                        keyboardType="numeric"
                        style={styles.input}
                        className="border border-gray-400 text-gray-400 font-poppins"
                    />
                </View>
            </View>

            <View style={styles.codeBox} className="border border-gray-800 bg-black/40">
                <Text style={styles.code} className="text-white font-jet-brains text-lg ">
                    {`withSpring(sv.value, {\n  mass: ${mass},\n  stiffness: ${stiffness},\n  damping: ${damping}\n})`}
                </Text>
            </View>
        </View>
    );
}


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
    chipActive: { backgroundColor: 'rgba(14, 168, 196, 1)'},
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
