import { View, Button, Text, StyleSheet } from 'react-native';
import { useFonts, Poppins_400Regular, Poppins_600SemiBold } from "@expo-google-fonts/poppins";
import "../../../global.css";

export default function Index() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
  });

  return (
    <View className="flex flex-1 flex-col justify-center" style={styles.flexContainer}>
      <Text className="font-poppins text-primary text-3xl">Rafael Tomaz</Text>

      <View>
        <Text className="font-poppins-semibold text-white" style={styles.title}>React Native</Text>
        <Text className="font-poppins-semibold text-primary" style={styles.title}>Reanimated</Text>
      </View>
      
      <Text className="font-poppins text-gray-400 text-3xl">
        Permite criar animações fluidas, interativas e de alto desempenho, oferecendo maior controle sobre movimentos e transições dos componentes.
      </Text>

    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 110,
    lineHeight: 100
  },
  flexContainer: {
    gap: 50
  }
})
