import { View, StyleSheet, TouchableOpacity } from "react-native";
import { width, height, totalSize } from "react-native-dimension";

import colors from "../config/colors";

import AppText from "./AppText";

export default function StockList({ stock, touchable, onPress = () => {} }) {
  return (
    <TouchableOpacity
      style={[
        styles.stock,
        {
          backgroundColor:
            Number(stock.change_pts) > 0
              ? colors.dark.stockIncrease + "20"
              : Number(stock.change_pts) < 0
              ? colors.dark.stockDecrease + "10"
              : colors.dark.secondary + "10",
        },
      ]}
      onPress={onPress}
      activeOpacity={touchable ? 0.5 : 1}
    >
      <View style={styles.stockInfo}>
        <AppText style={styles.companySymbol}>{stock.symbol}</AppText>
        <AppText style={styles.ltp}>Rs. {stock.ltp}</AppText>
      </View>
      <View style={styles.stockInfo}>
        <AppText style={styles.companyName}>
          Prev. Closing: {stock.prev_close}
        </AppText>
        <AppText
          style={{
            fontSize: totalSize(1.8),
            color:
              Number(stock.change_pts) > 0
                ? colors.dark.increasedGreeen
                : Number(stock.change_pts) < 0
                ? colors.dark.topLoserText
                : colors.dark.textColor,
          }}
        >
          {stock.change_pts}
        </AppText>
      </View>
      <AppText
        style={{
          fontSize: totalSize(1.3),
          alignSelf: "flex-end",
          color:
            Number(stock.change_pts) > 0
              ? colors.dark.increasedGreeen
              : Number(stock.change_pts) < 0
              ? colors.dark.topLoserText
              : colors.dark.textColor,
        }}
      >
        {stock.change_per}%
      </AppText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  stock: {
    marginVertical: height(0.5),
    paddingHorizontal: width(3),
    paddingVertical: width(2),
    borderRadius: width(2),
  },
  stockInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: height(0.8),
  },
  companySymbol: {
    fontSize: totalSize(2),
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  ltp: {
    fontSize: totalSize(1.7),
    color: colors.dark.textColor,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  companyName: {
    fontSize: totalSize(1.5),
    color: colors.dark.placeholderText,
    textTransform: "uppercase",
  },
  change_per: {},
});
