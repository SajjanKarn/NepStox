import { StyleSheet, Text, TouchableOpacity } from "react-native";

import { height, totalSize } from "react-native-dimension";
import colors from "../config/colors";

export default function AppButton({
  children,
  onPress = () => {},
  font,
  backgroundColor,
  textColor,
  squared = false,
  ...props
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.button,
        {
          backgroundColor: backgroundColor
            ? backgroundColor
            : colors.dark.button,
          opacity: props.disabled ? 0.5 : 1,
          borderRadius: squared ? totalSize(1) : totalSize(5),
        },
      ]}
      {...props}
    >
      <Text
        style={[
          styles.buttonText,
          { fontFamily: font ? font : "Riveruta-Bold" },
          { color: textColor ? textColor : colors.dark.secondary },
        ]}
      >
        {children}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.dark.button,
    width: "100%",
    height: height(7),
    borderRadius: totalSize(5),
    justifyContent: "center",
    alignItems: "center",
    marginVertical: height(1),
  },
  buttonText: {
    fontSize: totalSize(2),
  },
});
