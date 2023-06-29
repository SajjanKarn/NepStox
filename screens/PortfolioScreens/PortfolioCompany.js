import { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { DataTable } from "react-native-paper";
import { width, height, totalSize } from "react-native-dimension";
import { Area, Chart, Line } from "react-native-responsive-linechart";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useToast } from "react-native-toast-notifications";

import AppText from "../../components/AppText";
import Loader from "../../components/Loader";

import colors from "../../config/colors";
import useFetch from "../../hooks/useFetch";

import { getTimeStampOfDate } from "../../utils/time";
import {
  broker_commission,
  cost_per_share,
  sebon_commission,
  share_amount,
  total_paying_amount,
  sell_result,
} from "../../utils/formula";
import { supabase } from "../../config/supabase";

export default function PortfolioCompany() {
  const navigation = useNavigation();
  const params = useRoute().params;
  const toast = useToast();
  const [stockSummary, setStockSummary] = useState({
    sellResult: null,
    totalReceivedAmount: 0,
  });
  const [graphInterval, setGraphInterval] = useState("1D");
  const {
    data: companyData,
    loading,
    error,
  } = useFetch(`/nepse/company-details/${params?.symbol}`);
  const {
    data: companyGraphData,
    loading: graphLoading,
    error: graphError,
  } = useFetch(
    `/nepse/graph/company/${params?.symbol}/${getTimeStampOfDate(
      "2023-06-28",
      10
    )}/${getTimeStampOfDate("2023-06-29", 15)}/1/${graphInterval}`
  );
  const [portfolioCompanyData, setPortfolioCompanyData] = useState({});

  useEffect(() => {
    // set navigation bar title
    navigation.setOptions({
      headerTitle: params?.symbol,
    });
    const fetchCompanyData = async () => {
      try {
        const user = await supabase.auth.getUser();

        const { data, error } = await supabase
          .from("portfolio")
          .select("*")
          .eq("user_id", user.data.user.id)
          .eq("symbol", params?.symbol);

        if (error) throw error;

        const shareAmount = share_amount(
          data[0].quantity,
          data[0].buying_price
        );
        const sebonCommission = Number(sebon_commission(shareAmount));
        const brokerCommission = Number(broker_commission(shareAmount));
        const dpFee = 25;

        const totalPayingAmount = Number(
          total_paying_amount(
            Number(shareAmount),
            Number(sebonCommission),
            Number(brokerCommission),
            Number(dpFee)
          )
        );
        const sellResult = sell_result(
          data[0].quantity,
          data[0].buying_price,
          parseFloat(companyData?.data?.["Market Price"].replace(/,/g, "")),
          7.5
        );
        setStockSummary({
          ...stockSummary,
          sellResult,
          totalReceivedAmount: totalPayingAmount,
        });
        setPortfolioCompanyData(data[0]);
      } catch (error) {
        toast.show("Something went wrong!", {
          type: "danger",
          placement: "top",
          duration: 2000,
        });
      }
    };

    fetchCompanyData();
  }, [companyData?.data, portfolioCompanyData]);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: "center",
      }}
    >
      {loading ? (
        <Loader />
      ) : (
        portfolioCompanyData && (
          <>
            <View style={styles.headerContainer}>
              <AppText style={styles.headerSymbol} variant="Regular">
                {params?.symbol}
              </AppText>
              <AppText
                style={{
                  ...styles.headerMarketPrice,
                  color:
                    Number(companyData?.data?.Others.point_change) > 0
                      ? colors.dark.graphLineIncrease
                      : colors.dark.topLoserText,
                }}
                variant="Medium"
              >
                Rs. {companyData?.data?.["Market Price"]}
              </AppText>
              <AppText
                style={{
                  ...styles.headerChange,
                  color:
                    Number(companyData?.data?.Others.point_change) > 0
                      ? colors.dark.graphLineIncrease
                      : colors.dark.topLoserText,
                }}
                variant="Medium"
              >
                {companyData?.data?.Others.point_change} (
                {companyData?.data?.["% Change"]})
              </AppText>
            </View>

            {companyGraphData?.data?.length > 0 && (
              <View style={styles.chartContainer}>
                {graphLoading ? (
                  <Loader />
                ) : (
                  <Chart
                    style={{
                      width: "100%",
                      height: Dimensions.get("window").height / 2,
                    }}
                    data={companyGraphData?.data}
                    xDomain={{
                      min: companyGraphData?.data?.[0]?.x,
                      max: companyGraphData?.data?.[
                        companyGraphData?.data?.length - 1
                      ]?.x,
                    }}
                    yDomain={{
                      min:
                        Math.min(
                          ...companyGraphData?.data?.map((item) => item.y)
                        ) - 5,
                      max:
                        Math.max(
                          ...companyGraphData?.data?.map((item) => item.y)
                        ) + 2,
                    }}
                  >
                    <Area
                      style={{ flex: 1 }}
                      data={companyGraphData?.data}
                      smoothing="bezier"
                      tension={0.2}
                      theme={{
                        gradient: {
                          from: {
                            color:
                              Number(companyData?.data?.Others.point_change) > 0
                                ? colors.dark.stockIncrease
                                : colors.dark.stockDecrease,
                            opacity: 0.2,
                          },
                          to: {
                            color: colors.dark.primary,
                            opacity: 0,
                          },
                        },
                      }}
                    />
                    <Line
                      style={{ flex: 1 }}
                      data={companyGraphData?.data}
                      smoothing="bezier"
                      tension={0.2}
                      theme={{
                        stroke: {
                          color:
                            Number(companyData?.data?.Others.point_change) > 0
                              ? colors.dark.graphLineIncrease
                              : colors.dark.topLoserText,
                          width: totalSize(0.3),
                        },
                      }}
                    />
                  </Chart>
                )}
              </View>
            )}

            {companyGraphData?.data?.length > 0 && (
              <View style={styles.graphIntervalButtons}>
                <TouchableOpacity
                  style={{
                    ...styles.rowButton,
                    backgroundColor:
                      graphInterval === "1D"
                        ? Number(companyData?.data?.Others.point_change) >= 0
                          ? colors.dark.graphLineIncrease
                          : colors.dark.topLoserText
                        : colors.dark.secondary,
                  }}
                  onPress={() => setGraphInterval("1D")}
                >
                  <AppText
                    style={styles.rowButtonText}
                    variant="Medium"
                    color={
                      graphInterval === "1D"
                        ? colors.dark.textColor
                        : colors.dark.primary
                    }
                  >
                    1D
                  </AppText>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    ...styles.rowButton,
                    backgroundColor:
                      graphInterval === "1W"
                        ? Number(companyData?.data?.Others.point_change) >= 0
                          ? colors.dark.graphLineIncrease
                          : colors.dark.topLoserText
                        : colors.dark.secondary,
                  }}
                  onPress={() => setGraphInterval("1W")}
                >
                  <AppText
                    style={styles.rowButtonText}
                    variant="Medium"
                    color={
                      graphInterval === "1W"
                        ? colors.dark.textColor
                        : colors.dark.primary
                    }
                  >
                    1W
                  </AppText>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    ...styles.rowButton,
                    backgroundColor:
                      graphInterval === "1M"
                        ? Number(companyData?.data?.Others.point_change) >= 0
                          ? colors.dark.graphLineIncrease
                          : colors.dark.topLoserText
                        : colors.dark.secondary,
                  }}
                  onPress={() => setGraphInterval("1M")}
                >
                  <AppText
                    style={styles.rowButtonText}
                    variant="Medium"
                    color={
                      graphInterval === "1M"
                        ? colors.dark.textColor
                        : colors.dark.primary
                    }
                  >
                    1M
                  </AppText>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    ...styles.rowButton,
                    backgroundColor:
                      graphInterval === "1Y"
                        ? Number(companyData?.data?.Others.point_change) >= 0
                          ? colors.dark.graphLineIncrease
                          : colors.dark.topLoserText
                        : colors.dark.secondary,
                  }}
                  onPress={() => setGraphInterval("1Y")}
                >
                  <AppText
                    style={styles.rowButtonText}
                    variant="Medium"
                    color={
                      graphInterval === "1Y"
                        ? colors.dark.textColor
                        : colors.dark.primary
                    }
                  >
                    1Y
                  </AppText>
                </TouchableOpacity>
              </View>
            )}

            <View style={styles.userPositionContainer}>
              <AppText style={styles.statsTitle}>Your Position</AppText>
              <DataTable>
                <DataTable.Row>
                  <DataTable.Cell>
                    <AppText variant="Medium" style={styles.rowTitle}>
                      Shares
                    </AppText>
                  </DataTable.Cell>
                  <DataTable.Cell numeric>
                    <AppText variant="Medium" style={styles.rowValue}>
                      {portfolioCompanyData?.quantity}
                    </AppText>
                  </DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                  <DataTable.Cell>
                    <AppText variant="Medium" style={styles.rowTitle}>
                      Equity
                    </AppText>
                  </DataTable.Cell>
                  <DataTable.Cell numeric>
                    <AppText variant="Medium" style={styles.rowValue}>
                      Rs.{" "}
                      {(
                        portfolioCompanyData?.quantity *
                        parseFloat(
                          companyData?.data?.["Market Price"].replace(/,/g, "")
                        )
                      ).toLocaleString()}
                    </AppText>
                  </DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                  <DataTable.Cell>
                    <AppText variant="Medium" style={styles.rowTitle}>
                      AVG Cost
                    </AppText>
                  </DataTable.Cell>
                  <DataTable.Cell numeric>
                    <AppText variant="Medium" style={styles.rowValue}>
                      Rs. {portfolioCompanyData?.buying_price}
                    </AppText>
                  </DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                  <DataTable.Cell>
                    <AppText variant="Medium" style={styles.rowTitle}>
                      Portfolio Diversity
                    </AppText>
                  </DataTable.Cell>
                  <DataTable.Cell numeric>
                    <AppText variant="Medium" style={styles.rowValue}>
                      10%
                    </AppText>
                  </DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                  <DataTable.Cell>
                    <AppText variant="Medium" style={styles.rowTitle}>
                      Today's Return
                    </AppText>
                  </DataTable.Cell>
                  <DataTable.Cell numeric>
                    <AppText variant="Medium" style={styles.rowValue}>
                      Rs. 1250
                    </AppText>
                  </DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                  <DataTable.Cell>
                    <AppText variant="Medium" style={styles.rowTitle}>
                      Total Return
                    </AppText>
                  </DataTable.Cell>
                  <DataTable.Cell numeric>
                    <AppText variant="Medium" style={styles.rowValue}>
                      Rs. 1250
                    </AppText>
                  </DataTable.Cell>
                </DataTable.Row>
              </DataTable>
            </View>

            <View style={styles.statsContainer}>
              <AppText style={styles.statsTitle}>Stock Summary</AppText>
              <View style={styles.statsRow}>
                <DataTable>
                  <DataTable.Row style={styles.statsTableRow}>
                    <DataTable.Cell>
                      <AppText variant="Medium" style={styles.rowTitle}>
                        Current Units
                      </AppText>
                    </DataTable.Cell>
                    <DataTable.Cell numeric>
                      <AppText variant="Medium" style={styles.rowValue}>
                        {portfolioCompanyData?.quantity}
                      </AppText>
                    </DataTable.Cell>
                  </DataTable.Row>
                  <DataTable.Row style={styles.statsTableRow}>
                    <DataTable.Cell>
                      <AppText variant="Medium" style={styles.rowTitle}>
                        Investment
                      </AppText>
                    </DataTable.Cell>
                    <DataTable.Cell numeric>
                      <AppText variant="Medium" style={styles.rowValue}>
                        Rs.{" "}
                        {Math.floor(
                          stockSummary.totalReceivedAmount
                        ).toLocaleString()}
                      </AppText>
                    </DataTable.Cell>
                  </DataTable.Row>
                  <DataTable.Row style={styles.statsTableRow}>
                    <DataTable.Cell>
                      <AppText variant="Medium" style={styles.rowTitle}>
                        WACC
                      </AppText>
                    </DataTable.Cell>
                    <DataTable.Cell numeric>
                      <AppText variant="Medium" style={styles.rowValue}>
                        Rs.{" "}
                        {(
                          stockSummary?.totalReceivedAmount /
                          portfolioCompanyData?.quantity
                        ).toLocaleString()}
                      </AppText>
                    </DataTable.Cell>
                  </DataTable.Row>
                  <DataTable.Row style={styles.statsTableRow}>
                    <DataTable.Cell>
                      <AppText variant="Medium" style={styles.rowTitle}>
                        Current Value
                      </AppText>
                    </DataTable.Cell>
                    <DataTable.Cell numeric>
                      <AppText variant="Medium" style={styles.rowValue}>
                        Rs.{" "}
                        {(
                          parseFloat(
                            companyData?.data?.["Market Price"].replace(
                              /,/g,
                              ""
                            )
                          ) * portfolioCompanyData?.quantity
                        ).toLocaleString()}
                      </AppText>
                    </DataTable.Cell>
                  </DataTable.Row>
                  <DataTable.Row style={styles.statsTableRow}>
                    <DataTable.Cell>
                      <AppText variant="Medium" style={styles.rowTitle}>
                        Est. Profit
                      </AppText>
                    </DataTable.Cell>
                    <DataTable.Cell numeric>
                      <AppText variant="Medium" style={styles.rowValue}>
                        Rs.{" "}
                        {Math.ceil(
                          stockSummary?.sellResult?.netProfit
                        ).toLocaleString()}
                      </AppText>
                    </DataTable.Cell>
                  </DataTable.Row>
                </DataTable>
              </View>
              <View style={styles.statsRow}>
                <DataTable>
                  <DataTable.Row style={styles.statsTableRow}>
                    <DataTable.Cell>
                      <AppText variant="Medium" style={styles.rowTitle}>
                        Today's{" "}
                        {Number(companyData?.data?.Others?.point_change) >= 0
                          ? "Profit"
                          : "Loss"}
                      </AppText>
                    </DataTable.Cell>
                    <DataTable.Cell numeric>
                      <AppText
                        variant="Medium"
                        style={{
                          ...styles.rowValue,
                          color:
                            Number(companyData?.data?.Others?.point_change) >= 0
                              ? colors.dark.graphLineIncrease
                              : colors.dark.topLoserText,
                        }}
                      >
                        Rs. {Number(companyData?.data?.Others?.point_change)}
                      </AppText>
                    </DataTable.Cell>
                  </DataTable.Row>
                  <DataTable.Row style={styles.statsTableRow}>
                    <DataTable.Cell>
                      <AppText variant="Medium" style={styles.rowTitle}>
                        Proft %
                      </AppText>
                    </DataTable.Cell>
                    <DataTable.Cell numeric>
                      <AppText variant="Medium" style={styles.rowValue}>
                        Rs.{" "}
                        {(
                          (stockSummary.sellResult?.netProfit /
                            Math.floor(stockSummary.totalReceivedAmount)) *
                          100
                        ).toLocaleString()}
                        %
                      </AppText>
                    </DataTable.Cell>
                  </DataTable.Row>
                  <DataTable.Row style={styles.statsTableRow}>
                    <DataTable.Cell>
                      <AppText variant="Medium" style={styles.rowTitle}>
                        Receivable Amount
                      </AppText>
                    </DataTable.Cell>
                    <DataTable.Cell numeric>
                      <AppText variant="Medium" style={styles.rowValue}>
                        Rs.{" "}
                        {Math.ceil(
                          Number(stockSummary.sellResult?.receivableAmount)
                        ).toLocaleString()}
                      </AppText>
                    </DataTable.Cell>
                  </DataTable.Row>
                </DataTable>
              </View>
            </View>

            <View style={styles.statsContainer}>
              <AppText style={styles.statsTitle}>Today's Stats</AppText>
              <View style={styles.statsRow}>
                <DataTable>
                  <DataTable.Row style={styles.statsTableRow}>
                    <DataTable.Cell>
                      <AppText variant="Medium" style={styles.rowTitle}>
                        Open
                      </AppText>
                    </DataTable.Cell>
                    <DataTable.Cell numeric>
                      <AppText variant="Medium" style={styles.rowValue}>
                        Rs. {companyData?.data?.Others.open}
                      </AppText>
                    </DataTable.Cell>
                  </DataTable.Row>
                  <DataTable.Row style={styles.statsTableRow}>
                    <DataTable.Cell>
                      <AppText variant="Medium" style={styles.rowTitle}>
                        High
                      </AppText>
                    </DataTable.Cell>
                    <DataTable.Cell numeric>
                      <AppText variant="Medium" style={styles.rowValue}>
                        Rs. {companyData?.data?.Others.high}
                      </AppText>
                    </DataTable.Cell>
                  </DataTable.Row>
                  <DataTable.Row style={styles.statsTableRow}>
                    <DataTable.Cell>
                      <AppText variant="Medium" style={styles.rowTitle}>
                        Low
                      </AppText>
                    </DataTable.Cell>
                    <DataTable.Cell numeric>
                      <AppText variant="Medium" style={styles.rowValue}>
                        Rs. {companyData?.data?.Others.low}
                      </AppText>
                    </DataTable.Cell>
                  </DataTable.Row>
                  <DataTable.Row style={styles.statsTableRow}>
                    <DataTable.Cell>
                      <AppText variant="Medium" style={styles.rowTitle}>
                        52 Week High
                      </AppText>
                    </DataTable.Cell>
                    <DataTable.Cell numeric>
                      <AppText variant="Medium" style={styles.rowValue}>
                        Rs.{" "}
                        {
                          companyData?.data?.["52 Weeks High - Low"].split(
                            "-"
                          )[0]
                        }
                      </AppText>
                    </DataTable.Cell>
                  </DataTable.Row>
                  <DataTable.Row style={styles.statsTableRow}>
                    <DataTable.Cell>
                      <AppText variant="Medium" style={styles.rowTitle}>
                        52 Week Low
                      </AppText>
                    </DataTable.Cell>
                    <DataTable.Cell numeric>
                      <AppText variant="Medium" style={styles.rowValue}>
                        Rs.{" "}
                        {
                          companyData?.data?.["52 Weeks High - Low"].split(
                            "-"
                          )[1]
                        }
                      </AppText>
                    </DataTable.Cell>
                  </DataTable.Row>
                </DataTable>
              </View>
              <View style={styles.statsRow}>
                <DataTable>
                  <DataTable.Row style={styles.statsTableRow}>
                    <DataTable.Cell>
                      <AppText variant="Medium" style={styles.rowTitle}>
                        30D Avg Volume
                      </AppText>
                    </DataTable.Cell>
                    <DataTable.Cell numeric>
                      <AppText variant="Medium" style={styles.rowValue}>
                        Rs. {companyData?.data?.["30-Day Avg Volume"]}
                      </AppText>
                    </DataTable.Cell>
                  </DataTable.Row>
                  <DataTable.Row style={styles.statsTableRow}>
                    <DataTable.Cell>
                      <AppText variant="Medium" style={styles.rowTitle}>
                        Avg Price
                      </AppText>
                    </DataTable.Cell>
                    <DataTable.Cell numeric>
                      <AppText variant="Medium" style={styles.rowValue}>
                        Rs. 1250
                      </AppText>
                    </DataTable.Cell>
                  </DataTable.Row>
                  <DataTable.Row style={styles.statsTableRow}>
                    <DataTable.Cell>
                      <AppText variant="Medium" style={styles.rowTitle}>
                        Prev. Price
                      </AppText>
                    </DataTable.Cell>
                    <DataTable.Cell numeric>
                      <AppText variant="Medium" style={styles.rowValue}>
                        Rs. {companyData?.data?.Others.prev}
                      </AppText>
                    </DataTable.Cell>
                  </DataTable.Row>
                  <DataTable.Row style={styles.statsTableRow}>
                    <DataTable.Cell>
                      <AppText variant="Medium" style={styles.rowTitle}>
                        Market Cap.
                      </AppText>
                    </DataTable.Cell>
                    <DataTable.Cell numeric>
                      <AppText variant="Medium" style={styles.rowValue}>
                        {companyData?.data?.["Market Capitalization"] ?? "N/A"}
                      </AppText>
                    </DataTable.Cell>
                  </DataTable.Row>
                  <DataTable.Row style={styles.statsTableRow}>
                    <DataTable.Cell>
                      <AppText variant="Medium" style={styles.rowTitle}>
                        Last Traded on
                      </AppText>
                    </DataTable.Cell>
                    <DataTable.Cell numeric>
                      <AppText variant="Medium" style={styles.rowValue}>
                        {companyData?.data?.["Last Traded On"] ?? "N/A"}
                      </AppText>
                    </DataTable.Cell>
                  </DataTable.Row>
                </DataTable>
              </View>
            </View>

            <View style={styles.tradeHistoryContainer}>
              <AppText style={styles.statsTitle}>Trade History</AppText>
              <View style={styles.tradeHistory}>
                <View style={styles.row1}>
                  <AppText style={styles.tradePurchaseTitle} variant="Regular">
                    {portfolioCompanyData?.buying_date}
                  </AppText>
                  <AppText style={styles.tradeSource} variant="Medium">
                    from {portfolioCompanyData?.source}
                  </AppText>
                </View>
                <View style={styles.row2}>
                  <AppText style={styles.tradePurchasePrice} variant="Medium">
                    Rs.{" "}
                    {Number(
                      portfolioCompanyData?.buying_price *
                        portfolioCompanyData?.quantity
                    ).toLocaleString()}
                  </AppText>
                  <AppText style={styles.tradeUnits} variant="Regular">
                    {portfolioCompanyData?.quantity} units
                  </AppText>
                </View>
              </View>
            </View>
          </>
        )
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.dark.primary,
  },
  headerContainer: {
    paddingHorizontal: width(5),
    marginTop: height(2),
  },
  headerSymbol: {
    fontSize: totalSize(2.3),
    color: colors.dark.textColor,
  },
  headerMarketPrice: {
    fontSize: totalSize(2.7),
    color: colors.dark.textColor,
  },
  headerChange: {
    fontSize: totalSize(1.5),
    color: colors.dark.textColor,
  },
  flexCentre: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  // graph interval
  graphIntervalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: width(5),
    marginTop: height(2),
  },
  rowButton: {
    paddingHorizontal: width(5),
    paddingVertical: height(1.5),
    borderRadius: 5,
    backgroundColor: colors.dark.secondary,
  },
  rowButtonText: {
    fontSize: totalSize(1.3),
    color: colors.dark.textColor,
  },

  // table
  userPositionContainer: {
    paddingHorizontal: width(5),
    marginTop: height(2),
  },
  rowTitle: {
    fontSize: totalSize(1.5),
    color: "#737574",
    textTransform: "uppercase",
  },
  rowValue: {
    fontSize: totalSize(1.5),
    color: colors.dark.textColor,
  },
  statsContainer: {
    paddingHorizontal: width(5),
    marginTop: height(2),
  },
  statsTitle: {
    fontSize: totalSize(2),
    color: colors.dark.textColor,
    marginBottom: height(2),
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statsTableRow: {
    borderBottomWidth: 0,
  },

  // trade history
  tradeHistoryContainer: {
    paddingHorizontal: width(5),
    marginTop: height(2),
    paddingBottom: height(2),
  },
  tradeHistory: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: height(2),
    paddingHorizontal: width(5),
    backgroundColor: colors.dark.secondary,
    borderRadius: 10,
  },
  row1: {
    alignItems: "flex-start",
  },
  row2: {
    alignItems: "flex-end",
  },
  tradePurchaseTitle: {
    fontSize: totalSize(1.8),
    color: colors.dark.textColor,
  },
  tradeSource: {
    fontSize: totalSize(1.7),
    color: colors.dark.placeholderText,
    marginTop: height(1),
  },
  tradePurchasePrice: {
    fontSize: totalSize(2),
    color: colors.dark.textColor,
  },
  tradeUnits: {
    fontSize: totalSize(1.7),
    color: colors.dark.textColor,
    marginTop: height(1),
  },
});
