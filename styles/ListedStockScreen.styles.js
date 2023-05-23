import { StyleSheet } from "react-native";
import { width, height, totalSize } from "react-native-dimension";

import colors from "../config/colors";

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: width(5),
    backgroundColor: colors.dark.primary,
    // marginTop: StatusBar.currentHeight,
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

  // stock styles
  stocksContainer: {
    flex: 1,
  },
});
