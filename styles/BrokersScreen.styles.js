import { StyleSheet } from "react-native";
import { width, height, totalSize } from "react-native-dimension";
import colors from "../config/colors";

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.dark.primary,
    paddingHorizontal: width(5),
  },

  searchContainer: {
    marginVertical: height(2),
  },
  searchTitle: {
    fontSize: totalSize(2),
    color: colors.dark.button,
    textTransform: "uppercase",
    marginVertical: height(0.5),
    letterSpacing: 1,
  },

  brokersContainer: {
    flex: 1,
  },
  brokersTitle: {
    fontSize: totalSize(2.5),
    color: colors.dark.button,
    textTransform: "uppercase",
    marginVertical: height(0.7),
    letterSpacing: 1,
  },
  brokersListContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
  },
});
