import { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import { width, height, totalSize } from "react-native-dimension";
import { LineChart } from "react-native-chart-kit";
import { Table, Row, Rows } from "react-native-table-component";
import { AntDesign } from "@expo/vector-icons";

// components
import AppText from "../components/AppText";
import colors from "../config/colors";

import useFetch from "../hooks/useFetch";

export default function HomeScreen() {
  const [topGainer, setTopGainer] = useState({
    tableHead: ["Symbol", "Change", "CH %", "LTP"],
    tableData: [
      ["NABIL", "10.00", "10.00", "10.00"],
      ["RBB", "10.00", "10.00", "10.00"],
      ["NIC ASIA", "10.00", "10.00", "10.00"],
      ["NICA", "10.00", "10.00", "10.00"],
    ],
  });
  const [topLoser, setTopLoser] = useState({
    tableHead: ["Symbol", "Change", "CH %", "LTP"],
    tableData: [
      ["NABIL", "10.00", "10.00", "10.00"],
      ["RBB", "10.00", "10.00", "10.00"],
      ["NIC ASIA", "10.00", "10.00", "10.00"],
      ["NICA", "10.00", "10.00", "10.00"],
    ],
  });
  const { data, loading, error } = useFetch("/nepse/top-gainer");
  const {
    data: topLoserData,
    loading: topLoserLoading,
    error: topLoserError,
  } = useFetch("/nepse/top-loser");

  // useeffect for top gainer
  useEffect(() => {
    if (data?.data?.data?.length > 0) {
      // get only 5 data
      const tableData = data.data.data
        .slice(0, 5)
        .map((item) => [
          item.symbol,
          item.change_pts,
          `${item.diff_per}%`,
          item.close,
        ]);
      setTopGainer((prev) => ({ ...prev, tableData }));
    }
  }, [data, loading, error]);

  // useeffect for top loser
  useEffect(() => {
    if (topLoserData?.data?.data?.length > 0) {
      // get only 5 data
      const tableData = topLoserData.data.data
        .slice(0, 5)
        .map((item) => [
          item.symbol,
          item.change_pts,
          `${item.diff_per}%`,
          item.close,
        ]);
      setTopLoser((prev) => ({ ...prev, tableData }));
    }
  }, [topLoserData, topLoserLoading, topLoserError]);

  return (
    <ScrollView style={styles.container}>
      <StatusBar />

      <View style={styles.nepseIndexContainer}>
        <View style={styles.data}>
          <AppText style={styles.dataTitle}>Nepse</AppText>
          <AppText style={styles.dataValue}>678.51</AppText>
          <AppText style={styles.dataChange}>+3.00 (1.00%)</AppText>
        </View>
        <View style={styles.data}>
          <AppText style={styles.dataTitle}>Sensitive</AppText>
          <AppText style={styles.dataValue}>253.66</AppText>
          <AppText style={styles.dataChange}>+1.00 (2.20%)</AppText>
        </View>
        <View style={styles.data}>
          <AppText style={styles.dataTitle}>Float</AppText>
          <AppText style={styles.dataValue}>789.90</AppText>
          <AppText style={styles.dataChange}>+5.00 (5.56%)</AppText>
        </View>
      </View>

      <View style={styles.marketStatusContainer}>
        <View style={styles.marketStatus}>
          <AppText style={styles.marketStatusTitle}>Market Status</AppText>
          <View style={styles.statusContainer}>
            <View style={[styles.dot, styles.red]} />
            <AppText style={styles.marketStatusValue}>Closed</AppText>
          </View>
        </View>
        <View style={styles.marketStatusDate}>
          <AppText style={styles.marketStatusDateTitle}>May 22, 2023</AppText>
        </View>
        <View style={styles.marketStatusTime}>
          <AppText style={styles.marketStatusTimeTitle}>3:00PM</AppText>
        </View>
      </View>

      <View style={styles.indicators}>
        <View style={[styles.indicatorTile, styles.advanced]}>
          <AntDesign
            name="arrowup"
            size={20}
            color="white"
            style={styles.tileIcon}
          />
          <AppText style={styles.indicatorTitle}>Advanced</AppText>
        </View>
        <View style={[styles.indicatorTile, styles.declined]}>
          <AntDesign
            name="arrowdown"
            size={20}
            color="white"
            style={styles.tileIcon}
          />
          <AppText style={styles.indicatorTitle}>Declined</AppText>
        </View>
        <View style={[styles.indicatorTile, styles.unchanged]}>
          <AntDesign
            name="minus"
            size={20}
            color="white"
            style={styles.tileIcon}
          />
          <AppText style={styles.indicatorTitle}>Unchanged</AppText>
        </View>
      </View>

      <View style={styles.chartContainer}>
        <LineChart
          data={{
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
            datasets: [
              {
                data: [
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                ],
              },
            ],
          }}
          width={(90 / 100) * Dimensions.get("window").width} // from react-native
          height={220}
          //   yAxisLabel="$"
          //   yAxisSuffix="k"
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            backgroundColor: "#7d7c39",
            backgroundGradientFrom: "#64632d",
            backgroundGradientTo: "#e0df66",
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#aeae4f",
            },
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      </View>

      <View style={styles.gainerContainer}>
        <AppText style={styles.topGainerTitle}>Top Gainers</AppText>

        {loading ? (
          <ActivityIndicator size="large" color={colors.dark.button} />
        ) : (
          topGainer.tableData.length > 0 && (
            <Table
              borderStyle={styles.gainerTableBorder}
              style={styles.gainerTable}
            >
              <Row
                data={topGainer.tableHead}
                style={styles.head}
                textStyle={styles.headText}
              />
              <Rows data={topGainer.tableData} textStyle={styles.text} />
            </Table>
          )
        )}
      </View>

      <View style={styles.gainerContainer}>
        <AppText style={styles.topGainerTitle}>Top Loser</AppText>

        {topLoserLoading ? (
          <ActivityIndicator size="large" color={colors.dark.button} />
        ) : (
          topLoser.tableData.length > 0 && (
            <Table
              borderStyle={styles.gainerTableBorder}
              style={styles.gainerTable}
            >
              <Row
                data={topLoser.tableHead}
                style={[styles.head, styles.loserHead]}
                textStyle={styles.headText}
              />
              <Rows data={topLoser.tableData} textStyle={styles.text} />
            </Table>
          )
        )}
      </View>

      <View style={styles.marketSummaryContainer}>
        <View style={styles.marketSummary}>
          <AppText style={styles.marketSummaryTitle}>Market Summary</AppText>

          <View style={styles.marketSummaryCard}>
            <View style={styles.dataRow}>
              <AppText style={styles.dataRowTitle}>Total Turnover</AppText>
              <AppText style={styles.dataRowValue}>Rs. 1,000,000</AppText>
            </View>
            <View style={styles.dataRow}>
              <AppText style={styles.dataRowTitle}>Total Traded Shares</AppText>
              <AppText style={styles.dataRowValue}>1,000,000</AppText>
            </View>
            <View style={styles.dataRow}>
              <AppText style={styles.dataRowTitle}>Total Transaction</AppText>
              <AppText style={styles.dataRowValue}>1,000,000</AppText>
            </View>
            <View style={styles.dataRow}>
              <AppText style={styles.dataRowTitle}>Total Scrips Traded</AppText>
              <AppText style={styles.dataRowValue}>1,000,000</AppText>
            </View>
            <View style={styles.dataRow}>
              <AppText style={styles.dataRowTitle}>
                Market Capitalization
              </AppText>
              <AppText style={styles.dataRowValue}>1,000,000</AppText>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: width(5),
    backgroundColor: colors.dark.primary,
    // marginTop: StatusBar.currentHeight,
  },
  nepseIndexContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: height(2),
    backgroundColor: colors.dark.secondary,
    padding: width(5),
    borderRadius: width(2),
    elevation: 5,
  },
  nepseIndexChange: {
    fontSize: totalSize(1.5),
    color: colors.dark.nepseIndexChange,
  },
  dataContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: height(2),
  },
  data: {
    alignItems: "center",
  },
  dataTitle: {
    fontSize: totalSize(2),
    color: colors.dark.button,
    textTransform: "uppercase",
    marginVertical: height(0.5),
    letterSpacing: 1,
  },
  dataValue: {
    fontSize: totalSize(1.5),
    color: colors.dark.textColor,
    marginVertical: height(0.5),
  },
  dataChange: {
    fontSize: totalSize(1.5),
    color: colors.dark.topGainerText,
  },
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
  marketSummaryContainer: {
    marginBottom: height(2),
    backgroundColor: colors.dark.secondary,
    padding: width(5),
    borderRadius: width(2),
  },
  marketSummaryTitle: {
    fontSize: totalSize(2.3),
    color: colors.dark.button,
    textTransform: "uppercase",
    marginVertical: height(0.7),
    letterSpacing: 1,
  },
  dataRow: {
    marginVertical: height(0.5),
  },
  dataRowTitle: {
    fontSize: totalSize(2),
    textTransform: "uppercase",
    marginVertical: height(0.5),
    color: colors.dark.placeholderText,
    letterSpacing: 1,
  },
  dataRowValue: {
    fontSize: totalSize(1.7),
    color: colors.dark.textColor,
    marginVertical: height(0.5),
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

  // chart section
  chartContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: colors.dark.primary,
  },
  gainerContainer: {
    flex: 1,
    marginTop: height(2),
  },
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
    backgroundColor: colors.dark.topGainerText,
  },
  loserHead: {
    backgroundColor: colors.dark.topLoserText,
  },
  headText: {
    textAlign: "center",
    fontWeight: "bold",
    fontFamily: "Riveruta-Bold",
    color: colors.dark.textColor,
  },
  text: {
    padding: totalSize(1.5),
    textAlign: "center",
    color: colors.dark.textColor,
    fontFamily: "Riveruta-Regular",
  },
});
