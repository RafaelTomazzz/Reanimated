import "../../../global.css";
import { View, Text } from "react-native";

export default function Card({ children }){
    return (
        <View className="bg-background rounded-xl border border-gray-800 p-4">
            {children}
        </View>
    ) 
}