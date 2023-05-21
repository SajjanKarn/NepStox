import { useState } from "react";
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

// components
import AppText from "../components/AppText";
import colors from "../config/colors";

import useFetch from "../hooks/useFetch";
import { AntDesign } from "@expo/vector-icons";

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
  const { data, loading, error } = useFetch("/nepse/top-gainer");
  console.log(data, loading, error);

  return (
    <ScrollView style={styles.container}>
      <StatusBar />

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

      <View style={styles.topGainerContainer}>
        <AppText style={styles.topGainerTitle}>Top Gainers</AppText>

        {loading ? (
          <ActivityIndicator size="large" color={colors.dark.button} />
        ) : (
          <Table
            borderStyle={styles.topGainerBorderStyle}
            style={styles.topGainerTable}
          >
            <Row
              data={topGainer.tableHead}
              style={styles.head}
              textStyle={styles.headText}
            />
            <Rows data={topGainer.tableData} textStyle={styles.text} />
          </Table>
        )}
      </View>

      <View style={styles.topGainerContainer}>
        <AppText style={styles.topGainerTitle}>Top Loser</AppText>

        {loading ? (
          <ActivityIndicator size="large" color={colors.dark.button} />
        ) : (
          <Table
            borderStyle={styles.topGainerBorderStyle}
            style={styles.topGainerTable}
          >
            <Row
              data={topGainer.tableHead}
              style={styles.head}
              textStyle={styles.headText}
            />
            <Rows data={topGainer.tableData} textStyle={styles.text} />
          </Table>
        )}
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
    marginRight: width(1),
    borderRadius: totalSize(1),
  },
  tileIcon: {
    marginTop: height(0.5),
  },
  indicatorTitle: {
    fontSize: totalSize(1.7),
    fontWeight: "bold",
    textAlign: "center",
  },
  advanced: {
    backgroundColor: colors.dark.advanced,
  },
  declined: {
    backgroundColor: colors.dark.declined,
  },
  unchanged: {
    backgroundColor: colors.dark.unchanged,
  },
  chartContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: colors.dark.primary,
  },
  topGainerContainer: {
    flex: 1,
    marginTop: height(2),
  },
  topGainerTitle: {
    fontSize: totalSize(2),
    fontWeight: "bold",
    marginBottom: height(2),
  },
  topGainerBorderStyle: {
    borderWidth: 1,
    borderColor: colors.dark.placeholderText,
  },
  topGainerTable: {
    marginBottom: height(2),
  },
  head: {
    height: height(7),
    textAlign: "center",
    backgroundColor: colors.dark.button,
  },
  headText: {
    textAlign: "center",
    fontWeight: "bold",
    fontFamily: "Riveruta-Bold",
  },
  text: {
    padding: totalSize(1.5),
    textAlign: "center",
    color: colors.dark.textColor,
    fontFamily: "Riveruta-Regular",
  },
});
