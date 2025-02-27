import { StyleSheet } from "react-native";
import { width, height, totalSize } from "react-native-dimension";
import colors from "../config/colors";

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.dark.primary,
    paddingHorizontal: width(5),
  },
  companyInfoCard: {
    backgroundColor: colors.dark.secondary,
    borderRadius: totalSize(1),
    paddingHorizontal: width(5),
    paddingVertical: height(2),
    marginVertical: totalSize(1),
  },
  companyInfoCardHeader: {
    marginVertical: totalSize(1.5),
  },
  companyInfoCardHeaderText: {
    fontSize: totalSize(2),
    color: colors.dark.button,
    textTransform: "uppercase",
  },
  cardBodyText: {
    fontSize: totalSize(1.7),
    color: colors.dark.placeholderText,
  },
  todayDataContainer: {
    marginVertical: totalSize(1),
  },
  headerTitle: {
    fontSize: totalSize(2),
    color: colors.dark.button,
    textTransform: "uppercase",
    marginVertical: totalSize(1),
  },
  errorText: {
    fontSize: totalSize(2),
    color: colors.dark.button,
    textTransform: "uppercase",
    marginVertical: totalSize(5),
    textAlign: "center",
  },

  // scroll info
  scrollInfoContainer: {
    flex: 1,
    paddingVertical: height(2),
  },
  yValueText: {
    fontSize: totalSize(2.5),
    color: colors.dark.graphLineIncrease,
    marginBottom: height(1),
  },
  timeStampText: {
    fontSize: totalSize(1.8),
    color: colors.dark.placeholderText,
  },
  // row button
  graphIntervalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: height(1),
  },
  rowButton: {
    backgroundColor: colors.dark.secondary,
    borderRadius: totalSize(1),
    paddingHorizontal: width(6),
    paddingVertical: height(1.5),
  },
  rowButtonText: {
    fontSize: totalSize(1.6),
    color: colors.dark.textColor,
    textTransform: "uppercase",
  },
  // chart section
  chartContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  // accordion
  accordionContainer: {
    backgroundColor: colors.dark.secondary,
  },
  accordionTitle: {
    fontSize: totalSize(1.7),
    color: colors.dark.button,
    textTransform: "uppercase",
    marginVertical: totalSize(1),
  },
  accordionList: {
    backgroundColor: colors.dark.secondary,
    paddingHorizontal: width(5),
    color: colors.dark.placeholderText,
  },
  accordionListTitle: {
    fontSize: totalSize(1.5),
    color: colors.dark.textColor,
    marginVertical: totalSize(1),
  },
});
