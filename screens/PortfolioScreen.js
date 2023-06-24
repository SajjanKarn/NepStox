import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { width, height, totalSize } from "react-native-dimension";
import { FAB } from "react-native-paper";
import { Chart, Line, Area } from "react-native-responsive-linechart";

import colors from "../config/colors";
import AppText from "../components/AppText";

export default function PortfolioScreen() {
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.headerInvestmentContainer}>
          <AppText style={styles.headerTitle} variant="Regular">
            Investing
          </AppText>
          <AppText style={styles.headerTotalReturn} variant="Regular">
            Rs. 15,507.00
          </AppText>
          <AppText style={styles.netReturnPoint}>+95.00 (+0.62%)</AppText>
        </View>

        <View style={styles.chartContainer}>
          <Chart
            style={{
              width: "100%",
              height: Dimensions.get("window").height / 3,
            }}
            data={[
              { x: 0, y: 0 },
              { x: 1, y: 3 },
              { x: 2, y: 5 },
              { x: 3, y: 4 },
              { x: 4, y: 7 },
              { x: 5, y: 9 },
              { x: 6, y: 8 },
              { x: 7, y: 11 },
              { x: 8, y: 13 },
              { x: 9, y: 12 },
              { x: 10, y: 0 },
            ]}
            xDomain={{ min: 0, max: 10 }}
            yDomain={{ min: 0, max: 15 }}
          >
            <Area
              style={{ flex: 1 }}
              data={[
                { x: 0, y: 0 },
                { x: 1, y: 3 },
                { x: 2, y: 5 },
                { x: 3, y: 4 },
                { x: 4, y: 7 },
                { x: 5, y: 9 },
                { x: 6, y: 8 },
                { x: 7, y: 11 },
                { x: 8, y: 13 },
                { x: 9, y: 12 },
                { x: 10, y: 0 },
              ]}
              smoothing="bezier"
              tension={0.2}
              theme={{
                gradient: {
                  from: { color: colors.dark.stockIncrease, opacity: 0.08 },
                  to: {
                    color: colors.dark.primary,
                    opacity: 0,
                  },
                },
              }}
            />
            <Line
              style={{ flex: 1 }}
              data={[
                { x: 0, y: 0 },
                { x: 1, y: 3 },
                { x: 2, y: 5 },
                { x: 3, y: 4 },
                { x: 4, y: 7 },
                { x: 5, y: 9 },
                { x: 6, y: 8 },
                { x: 7, y: 11 },
                { x: 8, y: 13 },
                { x: 9, y: 12 },
                { x: 10, y: 0 },
              ]}
              smoothing="bezier"
              tension={0.2}
              theme={{
                stroke: {
                  color: colors.dark.graphLineIncrease,
                  width: totalSize(0.3),
                },
              }}
            />
          </Chart>
        </View>

        <View style={styles.stocks}>
          <AppText style={styles.stocksContainerTitle}>Your Stocks</AppText>

          <View style={styles.stocksContainer}>
            <TouchableOpacity
              style={styles.stock}
              onPress={() => console.log("Pressed")}
              activeOpacity={0.6}
            >
              <>
                <View style={styles.stockLeft}>
                  <AppText style={styles.stockName} variant="Medium">
                    UNLB
                  </AppText>
                  <AppText style={styles.stockUnit} variant="Medium">
                    10 units
                  </AppText>
                </View>
                <View style={styles.stockRight}>
                  <AppText style={styles.stockPrice} variant="Medium">
                    Rs. 1,000.00
                  </AppText>
                  <AppText style={styles.stockReturn} variant="Regular">
                    100.00
                  </AppText>
                </View>
              </>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.stock}
              onPress={() => console.log("Pressed")}
              activeOpacity={0.6}
            >
              <>
                <View style={styles.stockLeft}>
                  <AppText style={styles.stockName} variant="Medium">
                    SGHC
                  </AppText>
                  <AppText style={styles.stockUnit} variant="Medium">
                    10 units
                  </AppText>
                </View>
                <View style={styles.stockRight}>
                  <AppText style={styles.stockPrice} variant="Medium">
                    Rs. 1,000.00
                  </AppText>
                  <AppText style={styles.stockReturn} variant="Regular">
                    -50.00
                  </AppText>
                </View>
              </>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.stock}
              onPress={() => console.log("Pressed")}
              activeOpacity={0.6}
            >
              <>
                <View style={styles.stockLeft}>
                  <AppText style={styles.stockName} variant="Medium">
                    UNLB
                  </AppText>
                  <AppText style={styles.stockUnit} variant="Medium">
                    10 units
                  </AppText>
                </View>
                <View style={styles.stockRight}>
                  <AppText style={styles.stockPrice} variant="Medium">
                    Rs. 1,000.00
                  </AppText>
                  <AppText style={styles.stockReturn} variant="Regular">
                    100.00
                  </AppText>
                </View>
              </>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.stock}
              onPress={() => console.log("Pressed")}
              activeOpacity={0.6}
            >
              <>
                <View style={styles.stockLeft}>
                  <AppText style={styles.stockName} variant="Medium">
                    UNLB
                  </AppText>
                  <AppText style={styles.stockUnit} variant="Medium">
                    10 units
                  </AppText>
                </View>
                <View style={styles.stockRight}>
                  <AppText style={styles.stockPrice} variant="Medium">
                    Rs. 1,000.00
                  </AppText>
                  <AppText style={styles.stockReturn} variant="Regular">
                    100.00
                  </AppText>
                </View>
              </>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.stock}
              onPress={() => console.log("Pressed")}
              activeOpacity={0.6}
            >
              <>
                <View style={styles.stockLeft}>
                  <AppText style={styles.stockName} variant="Medium">
                    UNLB
                  </AppText>
                  <AppText style={styles.stockUnit} variant="Medium">
                    10 units
                  </AppText>
                </View>
                <View style={styles.stockRight}>
                  <AppText style={styles.stockPrice} variant="Medium">
                    Rs. 1,000.00
                  </AppText>
                  <AppText style={styles.stockReturn} variant="Regular">
                    100.00
                  </AppText>
                </View>
              </>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.stock}
              onPress={() => console.log("Pressed")}
              activeOpacity={0.6}
            >
              <>
                <View style={styles.stockLeft}>
                  <AppText style={styles.stockName} variant="Medium">
                    UNLB
                  </AppText>
                  <AppText style={styles.stockUnit} variant="Regular">
                    10 units
                  </AppText>
                </View>
                <View style={styles.stockRight}>
                  <AppText style={styles.stockPrice} variant="Medium">
                    Rs. 1,000.00
                  </AppText>
                  <AppText style={styles.stockReturn} variant="Regular">
                    100.00
                  </AppText>
                </View>
              </>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.spacer} />
      </ScrollView>

      <FAB
        style={{
          position: "absolute",
          right: 10,
          bottom: 10,
          backgroundColor: colors.dark.button,
        }}
        icon="plus"
        onPress={() => console.log("Pressed")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.dark.primary,
  },
  headerInvestmentContainer: {
    marginTop: height(1),
    paddingHorizontal: width(5),
  },
  headerTitle: {
    fontSize: totalSize(2),
    color: colors.dark.textColor,
    marginBottom: height(1),
  },
  headerTotalReturn: {
    fontSize: totalSize(2.8),
    color: colors.dark.textColor,
    marginBottom: height(0.3),
  },
  netReturnPoint: {
    fontSize: totalSize(1.6),
    color: colors.dark.textColor,
  },
  // chart
  dotSlider: {
    width: totalSize(1.2),
    height: totalSize(1.2),
    borderRadius: totalSize(1.2),
    backgroundColor: colors.dark.button,
  },
  // stocks
  stocks: {
    marginTop: height(2),
    paddingHorizontal: width(5),
  },
  stocksContainerTitle: {
    fontSize: totalSize(2.5),
    color: colors.dark.textColor,
    marginBottom: height(1),
  },
  stock: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: height(1.5),
    paddingHorizontal: width(1),
  },
  stockName: {
    fontSize: totalSize(2),
    color: colors.dark.textColor,
    paddingTop: height(1),
  },
  stockUnit: {
    fontSize: totalSize(1.6),
    color: colors.dark.textColor,
  },
  stockLeft: {
    alignItems: "flex-start",
  },
  stockRight: {
    alignItems: "flex-end",
  },
  stockPrice: {
    fontSize: totalSize(2),
    color: colors.dark.textColor,
    paddingTop: height(1),
  },
  stockReturn: {
    fontSize: totalSize(1.6),
    color: colors.dark.textColor,
  },
  // spacer
  spacer: {
    height: height(10),
  },
});
