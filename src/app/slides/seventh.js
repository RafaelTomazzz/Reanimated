import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withTiming,
    clamp,
    interpolateColor,
    interpolate    
} from 'react-native-reanimated';
// highlight-start
import {
    Gesture,
    GestureDetector,
    GestureHandlerRootView,
} from 'react-native-gesture-handler';
import { useState } from 'react';
import Card from '../components/Card';
import CodePreview from '../components/CodePreview';


export default function Seventh() {
    const jsCodeTap = `const pressed = useSharedValue(0);

const tap = Gesture.Tap()
.onBegin(() => {
    pressed.value = withTiming(1, { duration: 200 });
})
.onFinalize(() => {
    pressed.value = withTiming(0, { duration: 200 });
});

const animatedStyles = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
        pressed.value,
        [0, 1],
        ['rgb(14, 212, 246)', '#FFE04B']
    ),
    transform: [{ scale: interpolate(pressed.value, [0, 1], [1, 1.2]) }],
}));

return(
    <GestureHandlerRootView>
        <GestureDetector gesture={tap}>
            <Animated.View style={[styles.circle, animatedStyles]} />
        </GestureDetector>
    </GestureHandlerRootView>
);`

    const jsCodePan = `const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
const position = useSharedValue({ x: 0, y: 0 })
const pressedPad = useSharedValue(1)

const panSize = 80;

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
    .onFinalize(() => {
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
<View style={styles.container}
    onLayout={(e) => {
        const { width, height } = e.nativeEvent.layout;
        setContainerSize({ width, height });
    }}>
    <GestureDetector gesture={pan}>
        <Animated.View style={[styles.circle, animatedStylesPan]} />
    </GestureDetector>
</View>
);`

    const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
    const pressed = useSharedValue(0);

    const tap = Gesture.Tap()
        .onBegin(() => {
            pressed.value = withTiming(1, { duration: 200 });
        })
        .onFinalize(() => {
            pressed.value = withTiming(0, { duration: 200 });
        });

    const animatedStyles = useAnimatedStyle(() => ({
        backgroundColor: interpolateColor(
            pressed.value,
            [0, 1],
            ['rgb(14, 212, 246)', '#FFE04B']
        ),
        transform: [{ scale: interpolate(pressed.value, [0, 1], [1, 1.2]) }],
    }));

    const position = useSharedValue({ x: 0, y: 0 })
    const pressedPad = useSharedValue(1)

    const panSize = 80;

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
        .onFinalize(() => {
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
        <GestureHandlerRootView className="flex-1">
            <View className="mb-6">
                <Text className="text-white font-poppins-semibold text-5xl block">Gesture <Text className="text-primary">Handler</Text></Text>
            </View>

            <View className='flex flex-1 flex-row gap-6'>
                <View className="flex flex-col gap-6 flex-1">
                    <Card>
                        <Text className="text-xl text-white font-poppins-semibold mb-2">GestureHandlerRootView</Text>
                        <Text className="text-xl text-gray-400 font-poppins">Componente raiz que habilita e gerencia o sistema de gestos do React Native Gesture Handler.</Text>
                    </Card>

                    <Card>
                        <Text className="text-xl text-white font-poppins-semibold mb-2">GestureDetector</Text>
                        <Text className="text-xl text-gray-400 font-poppins">Componente responsável por indicar ao componente qual o gesto ele deve receber.</Text>
                    </Card>

                    <Card>
                        <Text className="text-xl text-white font-poppins-semibold mb-2">Tap</Text>
                        <Text className="text-xl text-gray-400 font-poppins">Gesto que é acionado quando o componente recebe um clique curto.</Text>
                    </Card>

                    <Card>
                        <Text className="text-xl text-white font-poppins-semibold mb-2">Pan</Text>
                        <Text className="text-xl text-gray-400 font-poppins">Gesto que é acionado quando o componente é arrastado.</Text>
                    </Card>
                </View>

                <View className="flex flex-col gap-2 flex-1">
                    <CodePreview jsCode={jsCodeTap}>
                        <View style={styles.container}>
                            <GestureDetector gesture={tap}>
                                <Animated.View style={[styles.circle, animatedStyles]} />
                            </GestureDetector>
                        </View>
                    </CodePreview>

                    <CodePreview jsCode={jsCodePan}>
                        <View style={styles.container}
                            onLayout={(e) => {
                                const { width, height } = e.nativeEvent.layout;
                                setContainerSize({ width, height });
                            }}>
                            <GestureDetector gesture={pan}>
                                <Animated.View style={[styles.circle, animatedStylesPan]} />
                            </GestureDetector>
                        </View>
                    </CodePreview>
                </View>
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
        height: 80,
        width: 80,
        borderRadius: 500,
        backgroundColor: 'rgb(14, 212, 246)'
    },
});