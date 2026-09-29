import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withTiming,
    clamp,
    withDecay
} from 'react-native-reanimated';
// highlight-start
import {
    Gesture,
    GestureDetector,
    GestureHandlerRootView,
} from 'react-native-gesture-handler';
import { useState } from 'react';


export default function Sixth() {
    const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
    const pressed = useSharedValue(false);

    const tap = Gesture.Tap()
        .onBegin(() => {
            pressed.value = true;
        })
        .onFinalize(() => {
            pressed.value = false;
        });

    const animatedStyles = useAnimatedStyle(() => ({
        backgroundColor: pressed.value ? '#FFE04B' : '#B58DF1',
        transform: [{ scale: pressed.value ? 1.2 : 1 }],
    }));

    const position = useSharedValue({ x: 0, y: 0 })
    const pressedPad = useSharedValue(1)

    const panSize = 120;

    const pan = Gesture.Pan()
        .onUpdate((e) => {
            const maxX = (containerSize.width - panSize) / 2;
            const maxY = (containerSize.height - panSize) / 2;

            position.value = {
                x: clamp(e.translationX, -maxX, maxX),
                y: clamp(e.translationY, -maxY, maxY),
            }
            const distance = Math.sqrt(e.translationX ** 2 + e.translationY ** 2);
            pressedPad.value = 1 + distance / 1000;
        })
        .onFinalize((e) => {
            const maxX = (containerSize.width - panSize) / 2;
            const maxY = (containerSize.height - panSize) / 2;

            position.value = {
                x: withTiming(0),
                y: withTiming(0)
            };
            pressedPad.value = withTiming(1)
        });

    const animatedStylesPan = useAnimatedStyle(() => ({
        transform: [
            { translateX: position.value.x },
            { translateY: position.value.y },
            { scale: pressedPad.value }]
    }))

    return (
                <GestureHandlerRootView style={styles.container}>
                <View style={styles.container}>
                    {/* highlight-next-line */}

                    <GestureDetector gesture={tap}>
                        <Animated.View style={[styles.circle, animatedStyles]} />

                        {/* highlight-next-line */}
                    </GestureDetector>
                </View>
                <View style={styles.container}
                    onLayout={(e) => {
                        const { width, height } = e.nativeEvent.layout;
                        setContainerSize({ width, height });
                    }}>
                    <GestureDetector gesture={pan}>
                        <Animated.View style={[styles.circle, animatedStylesPan]} />
                    </GestureDetector>
                </View>
            </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%'
    },
    circle: {
        height: 120,
        width: 120,
        borderRadius: 500,
        backgroundColor: '#B58DF1'
    },
});