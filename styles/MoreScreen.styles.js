import { StyleSheet } from "react-native";
import { width, height, totalSize } from "react-native-dimension";
import colors from "../config/colors";

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.dark.primary,
    paddingTop: height(1),
    paddingHorizontal: width(5),
  },
  optionContainer: {
    paddingBottom: height(5),
  },
  optionTitle: {
    color: colors.dark.textColor,
    fontSize: totalSize(2.5),
    marginBottom: height(2),
  },
  options: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: totalSize(1),
  },
});
