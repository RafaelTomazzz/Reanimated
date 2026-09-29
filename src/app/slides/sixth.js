import Animated, {
    useSharedValue,
    withTiming,
    withRepeat,
    useAnimatedStyle,
    withSequence,
} from 'react-native-reanimated';
import { View, Button, StyleSheet, Text } from 'react-native';
import React from 'react';
import CodePreview from '../components/CodePreview';
import Card from '../components/Card';

export default function Sixth() {
    const offset = useSharedValue(0);

    const style = useAnimatedStyle(() => ({
        transform: [{ translateX: offset.value }],
    }));

    const OFFSET = 40;
    const TIME = 250;

    const handlePress = () => {
        offset.value = withSequence(
            // start from -OFFSET
            withTiming(-OFFSET, { duration: TIME / 2 }),
            // shake between -OFFSET and OFFSET 5 times
            withRepeat(withTiming(OFFSET, { duration: TIME }), 5, true),
            // go back to 0 at the end
            withTiming(0, { duration: TIME / 2 })
        );
    };

    const jsCode = `const offset = useSharedValue(0);
    
const style = useAnimatedStyle(() => ({
    transform: [{ translateX: offset.value }],
}));

const handlePress = () => {
    offset.value = withSequence(
        withTiming(-OFFSET, { duration: TIME / 2 }),
        withRepeat(withTiming(OFFSET, { duration: TIME }), 5, true), 
        withTiming(0, { duration: TIME / 2 })
    );
};

//true significa reverse: a animação deve ser executada alternadamente no sentido normal e no sentido inverso

return (
    <View style={styles.container}>
        <Animated.View style={[styles.box, style]}/>
        <Button title="shake" onPress={handlePress} />
    </View>
);`

    return (
        <View className="flex-1">
            <View className="mb-12">
                <Text className="text-white font-poppins-semibold text-5xl block">withRepeat e withSequence</Text>
            </View>

            <View className='flex flex-1 flex-row gap-6'>
                <View className="flex flex-col gap-6 flex-1">
                    <Card>
                        <Text className="text-xl text-white font-poppins-semibold mb-2">withRepeat</Text>
                        <Text className="text-xl text-gray-400 font-poppins">Método permite que você repita uma animação qunatas vezes quiser, ou infinitamente.</Text>
                    </Card>

                    <Card>
                        <Text className="text-xl text-white font-poppins-semibold mb-2">withSequence</Text>
                        <Text className="text-xl text-gray-400 font-poppins">Método que tem a função de executar uma os mais animações em sequência.</Text>
                    </Card>
                </View>

                <View className="flex flex-col gap-6 flex-1">
                    <CodePreview jsCode={jsCode}>
                        <View className="flex align-center justify-center gap-4">
                            <Animated.View style={[styles.box, style]}/>
                        </View>
                        <Button title="shake" onPress={handlePress} />
                    </CodePreview>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    box: {
        width: 100,
        height: 100,
        margin: 20,
        borderRadius: 15,
        backgroundColor: 'rgb(14, 212, 246)',
    },
});