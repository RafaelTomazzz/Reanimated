import { View, Button, Text } from 'react-native';
import Animated from 'react-native-reanimated';
import { useSharedValue, withSpring } from 'react-native-reanimated';
import { useFonts, Poppins_400Regular, Poppins_600SemiBold } from "@expo-google-fonts/poppins";
import { JetBrainsMono_400Regular } from '@expo-google-fonts/jetbrains-mono';
import Card from '../components/Card';


export default function First() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    JetBrainsMono_400Regular
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View className="flex-1">
      <View className="mb-12">
        <Text className="text-primary font-poppins-semibold text-5xl block">O que é Reanimated?</Text>
      </View>

      <View className="flex-row gap-6">
        <View className="flex-1">
          <View className="flex flex-col gap-6">
            <Card>
              <Text className="text-xl text-white font-poppins-semibold mb-2">O que é?</Text>
              <Text className="text-xl text-gray-400 font-poppins">Uma biblioteca para React Native, para animações fluidas, interativas e responsivas.</Text>
            </Card>

            <Card>
              <Text className="text-xl text-white font-poppins-semibold mb-2">O que oferece?</Text>
              <Text className="text-xl text-gray-400 font-poppins">Animações em alto desempenho, animações baseadas em gestos, transições entre estados dos componentes, controle de movimento, escala, rotação e opacidade, etc.</Text>
            </Card>

            <Card>
              <Text className="text-xl text-white font-poppins-semibold mb-2">Principais ferramentas</Text>
              <Text className="text-xl text-gray-400 font-poppins">Shared Values, Animated Styles, With Timing, With Delay, With Spring, Gestures.</Text>
            </Card>
          </View>
          
        </View>

        <View className="flex-1">
          <Card>
            <Text className="text-xl text-white font-poppins-semibold mb-2">Instalação</Text>
            
            <Text className="text-xl text-gray-400 font-poppins mb-4">
              Passo 1 - Instalar os pacotes <Text className="font-jet-brains text-primary">react-native-reanimated</Text> e <Text className="font-jet-brains text-primary">react-native-worklets</Text> pelo npm:
            </Text>
            
            <View className="rounded-lg border border-gray-800 bg-black/40 p-4 mb-4">
              <Text className="font-jet-brains text-sm text-white text-lg">{`npm install react-native-worklets\nnpm install react-native-reanimated`}</Text>
            </View>

            <Text className="text-xl text-gray-400 font-poppins mb-4">
              Passo 2 - Reconstruir dependências nativas:
            </Text>

            <View className="rounded-lg border border-gray-800 bg-black/40 p-4 mb-4">
              <Text className="font-jet-brains text-sm text-white text-lg">{`npx expo prebuild`}</Text>
            </View>

            <Text className="text-xl text-white font-poppins-semibold mb-2">Worklets</Text>

            <Text className="text-xl text-gray-400 font-poppins mb-4">
              Pequenas funções executadas diretamente na UI Thread, permitindo que animações e interações sejam processadas de forma independente da JavaScript Thread, garantindo mais fluidez e desempenho.
            </Text>
          </Card>
        </View>
      </View>
    </View>
  );
}
