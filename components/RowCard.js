import { StyleSheet, View } from "react-native";
import { totalSize } from "react-native-dimension";

import AppText from "./AppText";
import colors from "../config/colors";

export default function RowCard({
  leftText = "left",
  rightText = "right",
  increased,
}) {
  return (
    <View
      style={{
        ...styles.rowCard,
        backgroundColor:
          increased === true
            ? colors.dark.stockIncrease + "80"
            : increased === false
            ? colors.dark.stockDecrease + "40"
            : colors.dark.secondary,
      }}
    >
      <View style={styles.rowCardLeft}>
        <AppText style={styles.rowCardLeftText}>{leftText}</AppText>
      </View>
      <View style={styles.rowCardRight}>
        <AppText style={styles.rowCardRightText}>{rightText}</AppText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rowCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.dark.secondary,
    borderRadius: totalSize(0.6),
    paddingHorizontal: totalSize(1),
    paddingVertical: totalSize(2),
    marginVertical: totalSize(1),
  },
});
