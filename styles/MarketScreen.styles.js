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
  container_fluid: {
    flex: 1,
    backgroundColor: colors.dark.primary,
    // marginTop: StatusBar.currentHeight,
  },
  searchContainer: {
    marginVertical: height(1.2),
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

  // market status section
  marketStatusContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: height(1),
    backgroundColor: colors.dark.secondary,
    padding: width(5),
    borderRadius: width(2),
  },
  marketStatus: {
    fontSize: totalSize(2),
    color: colors.dark.button,
    textTransform: "uppercase",
    marginVertical: height(0.5),
    letterSpacing: 1,
  },
  marketStatusTitle: {
    fontSize: totalSize(1.8),
    color: colors.dark.button,
    marginVertical: height(0.5),
    textTransform: "uppercase",
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: height(0.7),
  },
  dot: {
    height: totalSize(1.5),
    width: totalSize(1.5),
    borderRadius: totalSize(1.5),
    marginHorizontal: width(1),
  },
  green: {
    backgroundColor: colors.dark.topGainerText,
  },
  red: {
    backgroundColor: colors.dark.topLoserText,
  },

  // indicators section
  indicators: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: height(1),
    marginBottom: height(2),
  },
  indicatorTile: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: height(1),
    marginHorizontal: width(1),
    borderRadius: totalSize(1),
  },
  tileIcon: {
    marginTop: height(0.5),
  },
  indicatorTitle: {
    fontSize: totalSize(1.5),
    textAlign: "center",
  },
  advanced: {
    backgroundColor: colors.dark.topGainerText,
  },
  declined: {
    backgroundColor: colors.dark.topLoserText,
  },
  unchanged: {
    backgroundColor: colors.dark.unchanged,
  },
});
