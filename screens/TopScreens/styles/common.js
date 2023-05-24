import { StyleSheet } from "react-native";
import colors from "../../../config/colors";
import { width, height, totalSize } from "react-native-dimension";

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.dark.primary,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  // gainer
  topGainerTitle: {
    fontSize: totalSize(2),
    fontWeight: "bold",
    marginBottom: height(2),
  },
  gainerTableBorder: {
    borderWidth: 1,
    borderColor: colors.dark.placeholderText,
  },
  gainerTable: {
    marginBottom: height(2),
  },
  head: {
    height: height(7),
    textAlign: "center",
    backgroundColor: colors.dark.secondary,
  },
  loserHead: {
    backgroundColor: colors.dark.topLoserText,
  },
  headText: {
    fontSize: totalSize(1.5),
    textAlign: "center",
    fontWeight: "bold",
    textTransform: "uppercase",
    fontFamily: "Riveruta-Bold",
    color: colors.dark.textColor,
  },
  text: {
    padding: totalSize(1.8),
    fontSize: totalSize(1.4),
    fontFamily: "Riveruta-Medium",
    color: colors.dark.textColor,
    textAlign: "center",
  },
});
