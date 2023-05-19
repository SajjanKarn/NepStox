import { StyleSheet, TextInput } from "react-native";
import { height, totalSize, width } from "react-native-dimension";
import colors from "../config/colors";

export default function AppInput({ placeholder = "Placeholder", ...props }) {
  return (
    <TextInput
      placeholder={placeholder}
      style={styles.input}
      {...props}
      placeholderTextColor={colors.dark.placeholderText}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: colors.dark.secondary,
    color: colors.dark.textColor,
    fontSize: totalSize(2),
    paddingHorizontal: width(5),
    paddingVertical: height(2),
    borderRadius: totalSize(5),
    marginVertical: height(1),
    fontFamily: "Riveruta-Medium",
  },
});
