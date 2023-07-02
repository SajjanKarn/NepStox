import {
  View,
  ScrollView,
  Dimensions,
  StatusBar,
  SafeAreaView,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { height, totalSize } from "react-native-dimension";
import {
  Chart,
  Line,
  Area,
  HorizontalAxis,
  VerticalAxis,
  Tooltip,
} from "react-native-responsive-linechart";
import { Picker } from "@react-native-picker/picker";

// components
import AppText from "../components/AppText";
import Loader from "../components/Loader";
import Gainer from "../components/Gainer";

import colors from "../config/colors";

import useFetch from "../hooks/useFetch";

// styles
import styles from "../styles/HomeScreen.styles";
import { useEffect, useState } from "react";
import { getTimeStampOfDate } from "../utils/time";

export default function HomeScreen() {
  const [displayData, setDisplayData] = useState([]);
  const [graphSelected, setGraphSelected] = useState("nepse");
  const {
    data: indices,
    loading: indicesLoading,
    error: indicesError,
  } = useFetch("/nepse/indices");
  const { data, loading, error } = useFetch("/nepse/top-gainer");
  const {
    data: topLoserData,
    loading: topLoserLoading,
    error: topLoserError,
  } = useFetch("/nepse/top-loser");
  const {
    data: marketSummary,
    loading: marketSummaryLoading,
    error: marketSummaryError,
  } = useFetch("/nepse/market-summary");
  const {
    data: marketStatus,
    loading: marketStatusLoading,
    error: marketStatusError,
  } = useFetch("/nepse/market-status");
  const {
    data: marketOpenStatus,
    loading: marketOpenStatusLoading,
    error: marketOpenStatusError,
  } = useFetch("/nepse/status");
  const {
    data: chartData,
    loading: chartLoading,
    error: chartError,
  } = useFetch(
    `/nepse/graph/${graphSelected}/${getTimeStampOfDate(
      `${marketOpenStatus?.data?.date}`,
      10
    )}/${getTimeStampOfDate(`${marketOpenStatus?.data?.date}`, 15)}/1`
  );

  useEffect(() => {
    if (chartData?.data?.t) {
      const data = chartData?.data?.t?.map((item, index) => ({
        x: Number(item),
        y: Number(chartData?.data?.c[index]),
      }));

      setDisplayData(data);
    }
  }, [chartData]);

  return (
    <ScrollView style={styles.container}>
      <SafeAreaView>
        <StatusBar />

        <View style={styles.nepseIndexContainer}>
          {indicesLoading ? (
            <Loader />
          ) : (
            <>
              <View style={styles.data}>
                <AppText style={styles.dataTitle}>Nepse</AppText>
                <AppText style={styles.dataValue}>
                  {indices?.data?.data[0]?.Close}
                </AppText>
                <AppText
                  style={{
                    fontSize: totalSize(1.5),
                    color:
                      indices?.data?.data[0]["Point Change"] > 0
                        ? colors.dark.topGainerText
                        : colors.dark.topLoserText,
                  }}
                >
                  {indices?.data?.data[0]["Point Change"]} (
                  {indices?.data?.data[0]["% Change"]}%)
                </AppText>
              </View>
              <View style={styles.data}>
                <AppText style={styles.dataTitle}>Sensitive</AppText>
                <AppText style={styles.dataValue}>
                  {indices?.data?.data[1]?.Close}
                </AppText>
                <AppText
                  style={{
                    fontSize: totalSize(1.5),
                    color:
                      indices?.data?.data[1]["Point Change"] > 0
                        ? colors.dark.topGainerText
                        : colors.dark.topLoserText,
                  }}
                >
                  {indices?.data?.data[1]["Point Change"]} (
                  {indices?.data?.data[1]["% Change"]}%)
                </AppText>
              </View>
              <View style={styles.data}>
                <AppText style={styles.dataTitle}>Float</AppText>
                <AppText style={styles.dataValue}>
                  {indices?.data?.data[2]?.Close}
                </AppText>
                <AppText
                  style={{
                    fontSize: totalSize(1.5),
                    color:
                      indices?.data?.data[2]["Point Change"] > 0
                        ? colors.dark.topGainerText
                        : colors.dark.topLoserText,
                  }}
                >
                  {" "}
                  {indices?.data?.data[2]["Point Change"]} (
                  {indices?.data?.data[2]["% Change"]}%)
                </AppText>
              </View>
            </>
          )}
        </View>

        {marketOpenStatusLoading ? (
          <Loader />
        ) : (
          <View style={styles.marketStatusContainer}>
            <View style={styles.marketStatus}>
              <AppText style={styles.marketStatusTitle}>Market Status</AppText>
              <View style={styles.statusContainer}>
                <View
                  style={[
                    styles.dot,
                    marketOpenStatus?.data?.marketOpen
                      ? styles.green
                      : styles.red,
                  ]}
                />
                <AppText style={styles.marketStatusValue}>
                  {marketOpenStatus?.data?.marketOpen ? "Open  " : "Closed  "}
                  {marketOpenStatus?.data?.date.split(" ")[0]}
                </AppText>
              </View>
            </View>
            <View style={styles.marketStatusTime}>
              <AppText style={styles.marketStatusTimeTitle}>
                {marketOpenStatus?.data?.date.split(" ")[1]}
              </AppText>
            </View>
          </View>
        )}

        {marketStatusLoading ? (
          <Loader />
        ) : (
          <View style={styles.indicators}>
            <View style={[styles.indicatorTile, styles.advanced]}>
              <AntDesign
                name="arrowup"
                size={20}
                color="white"
                style={styles.tileIcon}
              />
              <AppText style={styles.indicatorValue}>
                {marketStatus?.data?.advanced}
              </AppText>
              <AppText style={styles.indicatorTitle}>Advanced</AppText>
            </View>
            <View style={[styles.indicatorTile, styles.declined]}>
              <AntDesign
                name="arrowdown"
                size={20}
                color="white"
                style={styles.tileIcon}
              />
              <AppText style={styles.indicatorValue}>
                {marketStatus?.data?.declined}
              </AppText>
              <AppText style={styles.indicatorTitle}>Declined</AppText>
            </View>
            <View style={[styles.indicatorTile, styles.unchanged]}>
              <AntDesign
                name="minus"
                size={20}
                color="white"
                style={styles.tileIcon}
              />
              <AppText style={styles.indicatorValue}>
                {marketStatus?.data?.unchanged}
              </AppText>
              <AppText style={styles.indicatorTitle}>Unchanged</AppText>
            </View>
          </View>
        )}

        {!chartLoading &&
          displayData.length > 0 &&
          !marketOpenStatusLoading && (
            <View style={styles.graphOptions}>
              <Picker
                selectedValue={graphSelected}
                onValueChange={(itemValue, itemIndex) =>
                  setGraphSelected(itemValue)
                }
                dropdownIconColor={colors.dark.placeholderText}
                style={{
                  color: colors.dark.textColor,
                  backgroundColor: colors.dark.secondary,
                  marginVertical: height(1),
                }}
              >
                <Picker.Item label="NEPSE" value="NEPSE" />
                <Picker.Item label="Sensitive" value="SENSITIVE" />
                <Picker.Item label="Float" value="FLOAT" />
                <Picker.Item label="Sensitive Float" value="SENFLOAT" />
              </Picker>
            </View>
          )}

        {chartLoading ? (
          <Loader />
        ) : (
          displayData.length > 0 && (
            <View style={styles.chartContainer}>
              <Chart
                style={{
                  height: (35 / 100) * Dimensions.get("screen").height,
                  width: "100%",
                }}
                data={displayData}
                padding={{ left: 45, bottom: 20, right: 1, top: 20 }}
                xDomain={
                  displayData.length > 0
                    ? {
                        min: displayData[0].x,
                        max: displayData[displayData.length - 1].x,
                      }
                    : { min: 0, max: 0 }
                }
                yDomain={
                  displayData.length > 0
                    ? {
                        // find the min and max of y axis
                        min: Math.min(...displayData.map((item) => item.y)),
                        max: Math.max(...displayData.map((item) => item.y)) + 5,
                      }
                    : { min: 0, max: 0 }
                }
              >
                <VerticalAxis
                  tickCount={7}
                  theme={{
                    grid: {
                      stroke: {
                        color: colors.dark.placeholderText,
                        width: 0.5,
                      },
                    },
                    labels: {
                      formatter: (v) => v.toFixed(2),
                      label: { color: colors.dark.textColor },
                    },
                  }}
                />
                <HorizontalAxis
                  tickCount={5}
                  theme={{
                    grid: {
                      stroke: {
                        color: colors.dark.placeholderText,
                        width: 0.5,
                      },
                    },
                    labels: {
                      visible: false,
                      label: {
                        color: colors.dark.textColor,
                      },
                    },
                  }}
                />
                <Area
                  smoothing="cubic-spline"
                  theme={{
                    gradient: {
                      from: {
                        color:
                          Number(
                            indices?.data?.data[
                              graphSelected === "NEPSE"
                                ? 0
                                : graphSelected === "SENSITIVE"
                                ? 1
                                : graphSelected === "FLOAT"
                                ? 2
                                : 3
                            ]["Point Change"]
                          ) > 0
                            ? colors.dark.topGainerText
                            : colors.dark.topLoserText,
                        opacity: 0.09,
                      },
                      to: {
                        color:
                          Number(
                            indices?.data?.data[
                              graphSelected === "NEPSE"
                                ? 0
                                : graphSelected === "SENSITIVE"
                                ? 1
                                : graphSelected === "FLOAT"
                                ? 2
                                : 3
                            ]["Point Change"]
                          ) > 0
                            ? colors.dark.stockIncrease
                            : colors.dark.stockDecrease,
                        opacity: 0.09,
                      },
                    },
                  }}
                />
                <Line
                  smoothing="cubic-spline"
                  theme={{
                    stroke: {
                      color:
                        Number(
                          indices?.data?.data[
                            graphSelected === "NEPSE"
                              ? 0
                              : graphSelected === "SENSITIVE"
                              ? 1
                              : graphSelected === "FLOAT"
                              ? 2
                              : 3
                          ]["Point Change"]
                        ) > 0
                          ? colors.dark.button
                          : colors.dark.topLoserText,
                      width: 2,
                    },
                    // scatter: {
                    //   default: {
                    //     width: 4,
                    //     height: 4,
                    //     rx: 2,
                    //     color: colors.dark.unchanged,
                    //   },
                    // },
                  }}
                  tension={0.3}
                  hideTooltipAfter={500}
                  tooltipComponent={
                    <Tooltip
                      theme={{
                        formatter: ({ y }) => y.toFixed(2),
                      }}
                    />
                  }
                />
              </Chart>
            </View>
          )
        )}

        <Gainer
          title="Top Gainers"
          data={data?.data?.data?.slice(0, 5)}
          loading={loading}
        />

        <Gainer
          title="Top Losers"
          data={topLoserData?.data?.data?.slice(0, 5)}
          loading={topLoserLoading}
          headerColor={colors.dark.topLoserText}
        />

        <View style={styles.marketSummaryContainer}>
          {marketSummaryLoading ? (
            <Loader />
          ) : marketSummaryError ? (
            <AppText>Error Loading Data</AppText>
          ) : (
            <View style={styles.marketSummary}>
              <AppText style={styles.marketSummaryTitle}>
                Market Summary
              </AppText>

              <View style={styles.marketSummaryCard}>
                <View style={styles.dataRow}>
                  <AppText style={styles.dataRowTitle}>Total Turnover</AppText>
                  <AppText style={styles.dataRowValue}>
                    Rs. {marketSummary?.data["Total Turnovers (Rs.)"]}
                  </AppText>
                </View>
                <View style={styles.dataRow}>
                  <AppText style={styles.dataRowTitle}>
                    Total Traded Shares
                  </AppText>
                  <AppText style={styles.dataRowValue}>
                    {marketSummary?.data["Total Traded Shares "]}
                  </AppText>
                </View>
                <View style={styles.dataRow}>
                  <AppText style={styles.dataRowTitle}>
                    Total Transaction
                  </AppText>
                  <AppText style={styles.dataRowValue}>
                    {marketSummary?.data["Total Transaction "]}
                  </AppText>
                </View>
                <View style={styles.dataRow}>
                  <AppText style={styles.dataRowTitle}>
                    Total Scrips Traded
                  </AppText>
                  <AppText style={styles.dataRowValue}>
                    {marketSummary?.data["Total Scrips Traded "]}
                  </AppText>
                </View>
                <View style={styles.dataRow}>
                  <AppText style={styles.dataRowTitle}>
                    Market Capitalization
                  </AppText>
                  <AppText style={styles.dataRowValue}>
                    {marketSummary?.data["Total Market Cap (Rs.)"]}
                  </AppText>
                </View>
              </View>
            </View>
          )}
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}
