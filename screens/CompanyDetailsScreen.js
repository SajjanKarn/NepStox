import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  View,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { List } from "react-native-paper";

import AppText from "../components/AppText";
import Loader from "../components/Loader";
import RowCard from "../components/RowCard";

import useFetch from "../hooks/useFetch";

import styles from "../styles/CompanyDetailsScreen.styles";
import { useState } from "react";
import {
  Area,
  Chart,
  HorizontalAxis,
  Line,
  Tooltip,
  VerticalAxis,
} from "react-native-responsive-linechart";
import {
  determineMarketClose,
  getDateFromTimeUnit,
  getTimeStamp,
  getTimeStampOfDate,
  parseTimestamp,
} from "../utils/time";
import colors from "../config/colors";

export default function CompanyDetailsScreen() {
  const { symbol } = useRoute().params;
  const [expaned, setExpanded] = useState({
    dividend: false,
    bonus: false,
    rightShare: false,
  });
  const [graphInterval, setGraphInterval] = useState("1");
  const [scrollValue, setScrollValue] = useState({
    x: 0,
    y: 0,
  });
  const {
    data: marketOpenStatus,
    loading: marketOpenStatusLoading,
    error: marketOpenStatusError,
  } = useFetch("/nepse/status");
  const { data, loading, error } = useFetch(`/nepse/company-details/${symbol}`);
  // const {
  //   data: chartData,
  //   loading: chartLoading,
  //   error: chartError,
  // } = useFetch(
  //   `/nepse/graph/company/${symbol.toUpperCase()}/${getTimeStampOfDate(
  //     `${marketOpenStatus?.data?.date}`,
  //     10
  //   )}/${getTimeStampOfDate(
  //     `${determineMarketClose() ?? `${marketOpenStatus?.data?.date}`}`,
  //     15
  //   )}/1/${graphInterval}`
  // );

  const [initialTimeStamp, setInitialTimeStamp] = useState(
    getTimeStampOfDate(`${marketOpenStatus?.data?.date}`, 10)
  );

  const {
    data: chartData,
    loading: chartLoading,
    error: chartError,
  } = useFetch(
    `/nepse/graph/company/${symbol.toUpperCase()}/${getTimeStampOfDate(
      `${
        graphInterval === "1"
          ? marketOpenStatus?.data?.date
          : graphInterval === "15"
          ? getDateFromTimeUnit(7)
          : graphInterval === "1M"
          ? getDateFromTimeUnit(30)
          : graphInterval === "1Y"
          ? getDateFromTimeUnit(365)
          : marketOpenStatus?.data?.date
      }`,
      10
    )}/2114360100/${graphInterval}`
  );

  const handleGraphIntervalChange = (interval) => {
    setGraphInterval(interval);
  };

  const handleDividendExpand = (type) => {
    setExpanded({
      ...expaned,
      [type]: !expaned[type],
    });
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: "center",
      }}
    >
      <SafeAreaView>
        <StatusBar barStyle="default" />
        {loading ? (
          <Loader />
        ) : error ? (
          <AppText style={styles.errorText}>
            Sorry, something went wrong.
          </AppText>
        ) : data?.data ? (
          <>
            {/* company info card  */}
            <View style={styles.companyInfoCard}>
              <View style={styles.companyInfoCardHeader}>
                <AppText style={styles.companyInfoCardHeaderText}>
                  {data?.data?.["Company Name"]}
                </AppText>
              </View>
              <View style={styles.companyInfoCardBody}>
                <AppText style={styles.cardBodyText} variant="Medium">
                  Sector: {data?.data?.["Sector"]}
                </AppText>
              </View>
            </View>

            {chartData?.data?.length > 0 && !marketOpenStatusLoading && (
              <View style={styles.graphIntervalContainer}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => handleGraphIntervalChange("1")}
                  style={{
                    ...styles.rowButton,
                    backgroundColor:
                      graphInterval === "1"
                        ? colors.dark.button
                        : colors.dark.secondary,
                  }}
                >
                  <AppText
                    style={{
                      ...styles.rowButtonText,
                      color:
                        graphInterval === "1"
                          ? colors.dark.primary
                          : colors.dark.textColor,
                    }}
                    variant="Medium"
                  >
                    1D
                  </AppText>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => handleGraphIntervalChange("15")}
                  style={{
                    ...styles.rowButton,
                    backgroundColor:
                      graphInterval === "15"
                        ? colors.dark.button
                        : colors.dark.secondary,
                  }}
                >
                  <AppText
                    style={{
                      ...styles.rowButtonText,
                      color:
                        graphInterval === "15"
                          ? colors.dark.primary
                          : colors.dark.textColor,
                    }}
                    variant="Medium"
                  >
                    1W
                  </AppText>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => handleGraphIntervalChange("1M")}
                  style={{
                    ...styles.rowButton,
                    backgroundColor:
                      graphInterval === "1M"
                        ? colors.dark.button
                        : colors.dark.secondary,
                  }}
                >
                  <AppText
                    style={{
                      ...styles.rowButtonText,
                      color:
                        graphInterval === "1M"
                          ? colors.dark.primary
                          : colors.dark.textColor,
                    }}
                    variant="Medium"
                  >
                    1M
                  </AppText>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => handleGraphIntervalChange("1Y")}
                  style={{
                    ...styles.rowButton,
                    backgroundColor:
                      graphInterval === "1Y"
                        ? colors.dark.button
                        : colors.dark.secondary,
                  }}
                >
                  <AppText
                    style={{
                      ...styles.rowButtonText,
                      color:
                        graphInterval === "1Y"
                          ? colors.dark.primary
                          : colors.dark.textColor,
                    }}
                    variant="Medium"
                  >
                    1Y
                  </AppText>
                </TouchableOpacity>
              </View>
            )}

            {scrollValue.x !== 0 && (
              <View style={styles.scrollInfoContainer}>
                <View style={styles.yValue}>
                  <AppText
                    style={{
                      ...styles.yValueText,
                      color:
                        Number(data?.data?.["% Change"].split(" %")[0]) >= 0
                          ? colors.dark.graphLineIncrease
                          : colors.dark.topLoserText,
                    }}
                    variant="Medium"
                  >
                    {scrollValue.y}
                  </AppText>
                </View>
                <View style={styles.timeStamp}>
                  <AppText style={styles.timeStampText} variant="Medium">
                    {parseTimestamp(scrollValue.x)}
                  </AppText>
                </View>
              </View>
            )}

            {chartLoading ? (
              <Loader />
            ) : chartError ? (
              <AppText style={styles.errorText}>
                Sorry, something went wrong.
              </AppText>
            ) : (
              chartData?.data?.length > 0 && (
                <View style={styles.chartContainer}>
                  <Chart
                    style={{
                      height: (35 / 100) * Dimensions.get("screen").height,
                      width: "100%",
                    }}
                    data={chartData?.data}
                    padding={{ left: 45, bottom: 20, right: 1, top: 20 }}
                    xDomain={
                      chartData?.data?.length > 0
                        ? {
                            min: chartData?.data[0].x,
                            max: chartData?.data[chartData?.data?.length - 1].x,
                          }
                        : { min: 0, max: 0 }
                    }
                  >
                    {chartData?.data?.length > 1 && (
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
                    )}
                    {chartData?.data?.length > 1 && (
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
                    )}
                    <Area
                      // smoothing="cubic-spline"
                      theme={{
                        gradient: {
                          from: {
                            color:
                              Number(data?.data?.["% Change"].split(" %")[0]) >=
                              0
                                ? colors.dark.topGainerText
                                : colors.dark.topLoserText,
                          },
                          to: {
                            color:
                              Number(data?.data?.["% Change"].split(" %")[0]) >=
                              0
                                ? colors.dark.topGainerText
                                : colors.dark.topLoserText,
                            opacity: 0.09,
                          },
                        },
                      }}
                    />
                    <Line
                      // smoothing="cubic-spline"

                      theme={{
                        stroke: {
                          color:
                            Number(data?.data?.["% Change"].split(" %")[0]) >= 0
                              ? colors.dark.button
                              : colors.dark.topLoserText,
                          width: 1.3,
                          opacity: 0.7,
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
                      onTooltipSelect={(tooltipData) => {
                        setScrollValue({
                          x: tooltipData?.x,
                          y: tooltipData?.y,
                        });
                      }}
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

            {/* today's data  */}
            <View style={styles.todayDataContainer}>
              <AppText style={styles.headerTitle}>Today's Data</AppText>

              <RowCard
                leftText="As Of"
                rightText={data?.data?.["Last Traded On"]}
                increased={
                  Number(data?.data?.["% Change"].split(" %")[0]) > 0
                    ? true
                    : Number(data?.data?.["% Change"].split(" %")[0]) < 0
                    ? false
                    : null
                }
              />
              <RowCard
                leftText="Last Traded Price"
                rightText={`Rs. ${data?.data?.["Market Price"]}`}
                increased={
                  Number(data?.data?.["% Change"].split(" %")[0]) > 0
                    ? true
                    : Number(data?.data?.["% Change"].split(" %")[0]) < 0
                    ? false
                    : null
                }
              />
              <RowCard
                leftText="Point Change"
                rightText={`Rs. ${data?.data?.Others?.point_change}`}
                increased={
                  Number(data?.data?.["% Change"].split(" %")[0]) > 0
                    ? true
                    : Number(data?.data?.["% Change"].split(" %")[0]) < 0
                    ? false
                    : null
                }
              />
              <RowCard
                leftText="Percentage Change"
                rightText={data?.data?.["% Change"]}
                increased={
                  Number(data?.data?.["% Change"].split(" %")[0]) > 0
                    ? true
                    : Number(data?.data?.["% Change"].split(" %")[0]) < 0
                    ? false
                    : null
                }
              />
              <RowCard
                leftText="Previous Close"
                rightText={`Rs. ${data?.data?.Others?.prev}`}
              />
              <RowCard
                leftText="Open"
                rightText={`Rs. ${data?.data?.Others?.open}`}
              />
              <RowCard
                leftText="High"
                rightText={`Rs. ${data?.data?.Others?.high}`}
              />
              <RowCard
                leftText="Low"
                rightText={`Rs. ${data?.data?.Others?.low}`}
              />
              <RowCard
                leftText="52 Week High"
                rightText={`Rs. ${
                  data?.data?.["52 Weeks High - Low"].split("-")[0]
                }`}
              />
              <RowCard
                leftText="52 Week Low"
                rightText={`Rs. ${
                  data?.data?.["52 Weeks High - Low"].split("-")[1]
                }`}
              />
            </View>

            <View style={styles.todayDataContainer}>
              <AppText style={styles.headerTitle}>Performance Values</AppText>

              <RowCard
                leftText="1 Year Yield"
                rightText={`Rs. ${data?.data?.["1 Year Yield"]}`}
              />
              <RowCard
                leftText="EPS"
                rightText={`Rs. ${data?.data?.["EPS"]}`}
              />
              <RowCard
                leftText="PE Ratio"
                rightText={data?.data?.["P/E Ratio"]}
              />
              <RowCard
                leftText="Book Value Per Share"
                rightText={`${data?.data?.["Book Value"]}`}
              />
              <RowCard leftText="PBV" rightText={`${data?.data?.["PBV"]}`} />
            </View>

            <View style={styles.todayDataContainer}>
              <AppText style={styles.headerTitle}>General Information</AppText>

              <RowCard
                leftText="Market Capitalization"
                rightText={`Rs. ${data?.data?.["Market Capitalization"]}`}
              />
              <RowCard
                leftText="Total Listed Shares"
                rightText={data?.data?.["Shares Outstanding"]}
              />
              <RowCard
                leftText="52 Week High/Low"
                rightText={`${data?.data?.["52 Weeks High - Low"]}`}
              />

              {data?.data?.Dividend?.length > 0 && (
                <List.Accordion
                  title="Dividend"
                  expanded={expaned.dividend}
                  onPress={() => handleDividendExpand("dividend")}
                  style={styles.accordionContainer}
                  titleStyle={styles.accordionTitle}
                  rippleColor={colors.dark.button + "30"}
                >
                  {data?.data?.Dividend?.map((dividend) => (
                    <List.Item
                      key={dividend.id}
                      title={`${dividend.Value} ${dividend["Fiscal Year"]}`}
                      titleStyle={styles.accordionListTitle}
                      style={styles.accordionList}
                    />
                  ))}
                </List.Accordion>
              )}
              {data?.data?.Bonus?.length > 0 && (
                <List.Accordion
                  title="Bonus"
                  expanded={expaned.bonus}
                  onPress={() => handleDividendExpand("bonus")}
                  style={styles.accordionContainer}
                  titleStyle={styles.accordionTitle}
                  rippleColor={colors.dark.button + "30"}
                >
                  {data?.data?.Bonus?.map((dividend) => (
                    <List.Item
                      key={dividend.id}
                      title={`${dividend.Value} ${dividend["Fiscal Year"]}`}
                      titleStyle={styles.accordionListTitle}
                      style={styles.accordionList}
                    />
                  ))}
                </List.Accordion>
              )}
              {data?.data?.["Right Share"]?.length > 0 && (
                <List.Accordion
                  title="Right Share"
                  expanded={expaned.rightShare}
                  onPress={() => handleDividendExpand("rightShare")}
                  style={styles.accordionContainer}
                  titleStyle={styles.accordionTitle}
                  rippleColor={colors.dark.button + "30"}
                >
                  {data?.data?.["Right Share"]?.map((dividend) => (
                    <List.Item
                      key={dividend.id}
                      title={`${dividend.Value} ${dividend["Fiscal Year"]}`}
                      titleStyle={styles.accordionListTitle}
                      style={styles.accordionList}
                    />
                  ))}
                </List.Accordion>
              )}
            </View>
          </>
        ) : (
          <AppText style={styles.errorText}>
            Sorry, no data available for this company.
          </AppText>
        )}
      </SafeAreaView>
    </ScrollView>
  );
}
