import { useId } from "react";
import Svg, { Defs, RadialGradient, Stop, Circle } from "react-native-svg";

export default function Glow({ size = 800, color = "#0ed4f6" }) {
  const id = useId(); // id único, evita conflito entre vários glows

  return (
    <Svg width={size} height={size} pointerEvents="none">
      <Defs>
        <RadialGradient id={id} cx="50%" cy="50%" r="50%">
          <Stop offset="0" stopColor={color} stopOpacity="0.15" />
          <Stop offset="0.35" stopColor={color} stopOpacity="0.1" />
          <Stop offset="0.7" stopColor={color} stopOpacity="0.05" />
          <Stop offset="1" stopColor={color} stopOpacity="0" />
        </RadialGradient>
      </Defs>
      <Circle cx={size / 2} cy={size / 2} r={size / 2} fill={`url(#${id})`} />
    </Svg>
  );
}