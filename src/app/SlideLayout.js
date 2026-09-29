import "../../global.css";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
    interpolate,
    interpolateColor,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';

import Glow from "./components/Glow";
import IndexSlide from "./slides";
import FirstSlide from "./slides/first";
import SecondSlide from "./slides/second";
import ThirdSlide from "./slides/third";
import FourthSlide from "./slides/fourth";
import FifthSlide from "./slides/fifth";
import SixthSlide from "./slides/sixth";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
const slides = [IndexSlide, FirstSlide, SecondSlide, ThirdSlide, FourthSlide, FifthSlide, SixthSlide];

function AnimatedPageIndicator({ active, onPress }) {
    const progress = useSharedValue(active ? 1 : 0);

    useEffect(() => {
        progress.value = withTiming(active ? 1 : 0, { duration: 250 });
    }, [active, progress]);

    const animatedStyle = useAnimatedStyle(() => ({
        width: interpolate(progress.value, [0, 1], [12, 32]),
        backgroundColor: interpolateColor(
            progress.value,
            [0, 1],
            ['#38393f', '#0ed4f6'],
        ),
    }));

    return (
        <AnimatedPressable
            onPress={onPress}
            style={[styles.pageIndicator, animatedStyle]}
        />
    );
}

export default function SlideLayout() {
    const [activePage, setActivePage] = useState(0);
    const CurrentSlide = slides[activePage];

    return (
        <LinearGradient
            colors={['#070d1a', '#070d1a']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.container}>
            <View className="absolute" style={{top: -250, right: -250}}><Glow/></View>
            <View className="absolute" style={{bottom: -250, left: -250}}><Glow/></View>

            <View className="flex flex-col flex-1">
                <View className="flex flex-1 p-[80px]">
                    <CurrentSlide />
                </View>
                <View className="w-full border-t border-gray-800" style={styles.footer}>
                    <View style={styles.pagination}>
                        <Pressable
                            style={[styles.navigationButton, styles.previousButton]}
                            onPress={() => setActivePage((currentPage) => Math.max(0, currentPage - 1))}>
                            <Text selectable={false} style={styles.previousButtonText}>← Anterior</Text>
                        </Pressable>

                        <View style={styles.indicators}>
                            {slides.map((_, index) => (
                                <AnimatedPageIndicator
                                    key={index}
                                    active={index === activePage}
                                    onPress={() => setActivePage(index)}
                                />
                            ))}
                        </View>
                        
                        <Pressable
                            style={[styles.navigationButton, styles.nextButton]}
                            onPress={() => setActivePage((currentPage) => Math.min(slides.length - 1, currentPage + 1))}>
                            <Text selectable={false} style={styles.nextButtonText}>Próximo →</Text>
                        </Pressable>
                    </View>
                </View>
            </View>

        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    footer: {
        height: 100,
        backgroundColor: '#020309',
        justifyContent: 'center',
    },
    pagination: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 16,
        paddingHorizontal: 8,
    },
    navigationButton: {
        height: 44,
        minWidth: 126,
        paddingHorizontal: 16,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 24,
    },
    previousButton: {
        backgroundColor: '#101827',
        borderWidth: 1,
        borderColor: '#242b3a',
    },
    nextButton: {
        backgroundColor: '#0ed4f6',
    },
    previousButtonText: {
        color: '#ffffff',
        fontSize: 16,
    },
    nextButtonText: {
        color: '#020309',
        fontSize: 16,
    },
    indicators: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    pageIndicator: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: '#38393f',
    },
})