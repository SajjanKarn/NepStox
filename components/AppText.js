import { Text } from "react-native";
import colors from "../config/colors";

export default function AppText({
  variant = "Bold",
  children,
  onPress,
  textColor,
  ...props
}) {
  return (
    <Text
      style={{
        fontFamily: `Riveruta-${variant}`,
        color: colors.dark.textColor,
        ...props.style,
      }}
      onPress={onPress}
    >
      {children}
    </Text>
  );
}
