import { StyleSheet, Text, TouchableOpacity } from "react-native";

import { height, totalSize } from "react-native-dimension";
import colors from "../config/colors";

export default function AppButton({
  children,
  onPress = () => {},
  font,
  backgroundColor,
  textColor,
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
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: height(1),
  },
  buttonText: {
    fontSize: totalSize(2),
  },
});
