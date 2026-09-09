import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import "../../global.css";
import Animated from 'react-native-reanimated';
import { useSharedValue } from 'react-native-reanimated';

export default function App() {
  const width = useSharedValue(100)

  return (
    <View>
      <Animated.View
        style={{
          width,
          height: 100,
          backgroundColor: 'violet'
        }}  
      />
      <Button title='Clique aqui'/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
