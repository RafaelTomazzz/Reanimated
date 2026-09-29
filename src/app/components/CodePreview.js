import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { JetBrainsMono_400Regular } from '@expo-google-fonts/jetbrains-mono';
import { useFonts } from 'expo-font';

const tabs = [
    { id: 'preview', label: 'Preview' },
    { id: 'js', label: 'JS' },
];

export default function CodePreview({ children, jsCode = '' }) {
    const [activeTab, setActiveTab] = useState('preview');
    const [copied, setCopied] = useState(false);
    const [fontsLoaded] = useFonts({ JetBrainsMono_400Regular });

    if (!fontsLoaded) {
        return null;
    }

    const code = activeTab === 'js' ? jsCode : '';

    const copyCode = async () => {
        if (!code) return;

        try {
            await Clipboard.setStringAsync(code);
            setCopied(true);
        } catch {
            setCopied(false);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.toolbar}>
                {tabs.map((tab) => {
                    const selected = activeTab === tab.id;

                    return (
                        <Pressable
                            key={tab.id}
                            accessibilityRole="tab"
                            accessibilityState={{ selected }}
                            onPress={() => {
                                setActiveTab(tab.id);
                                setCopied(false);
                            }}
                            style={[styles.tab, selected && styles.selectedTab]}
                        >
                            <Text style={[styles.tabLabel, selected && styles.selectedTabLabel]}>
                                {tab.label}
                            </Text>
                        </Pressable>
                    );
                })}

                <View style={styles.toolbarSpacer} />
            </View>

            <View style={styles.content}>
                {activeTab === 'preview' ? (
                    <View style={styles.previewStage}>{children}</View>
                ) : (
                    <ScrollView
                        style={styles.codeStage}
                        contentContainerStyle={styles.codeContent}
                    >
                        <Text selectable className="text-lg" style={styles.codeText}>{code}</Text>
                    </ScrollView>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        minHeight: 320,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#242b3a',
        borderRadius: 10,
        backgroundColor: '#070d1a',
    },
    toolbar: {
        height: 52,
        flexDirection: 'row',
        alignItems: 'stretch',
        paddingHorizontal: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#242b3a',
    },
    tab: {
        minWidth: 42,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
        borderBottomWidth: 2,
        borderBottomColor: 'transparent',
    },
    selectedTab: {
        borderBottomColor: '#0ed4f6',
    },
    tabLabel: {
        color: '#9299a8',
        fontSize: 14,
    },
    selectedTabLabel: {
        color: '#ffffff',
        fontWeight: '600',
    },
    toolbarSpacer: {
        flex: 1,
    },
    actionButton: {
        minWidth: 44,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 8,
    },
    actionLabel: {
        color: '#c6ccd8',
        fontSize: 13,
    },
    disabledActionLabel: {
        color: '#596171',
    },
    content: {
        flex: 1,
        padding: 12,
    },
    previewStage: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 6,
        backgroundColor: '#f5f6fb',
    },
    codeStage: {
        flex: 1,
        borderRadius: 6,
        backgroundColor: '#0b1120',
    },
    codeContent: {
        padding: 16,
    },
    codeText: {
        color: '#dce5f5',
        fontFamily: 'JetBrainsMono_400Regular',
        fontSize: 13,
        lineHeight: 21,
    },
    footer: {
        height: 40,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingHorizontal: 8,
    },
    resetLabel: {
        color: '#c6ccd8',
        fontSize: 24,
        lineHeight: 28,
    },
});