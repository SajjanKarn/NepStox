import { useEffect, useState } from "react";
import { View, TouchableOpacity, Dimensions, Alert } from "react-native";
import { totalSize } from "react-native-dimension";
import { ActivityIndicator, FAB } from "react-native-paper";
import { Chart, Line, Area } from "react-native-responsive-linechart";
import { useNavigation } from "@react-navigation/native";
import { useToast } from "react-native-toast-notifications";
import { FlashList } from "@shopify/flash-list";

import AppText from "../../components/AppText";
import useFetch from "../../hooks/useFetch";

import colors from "../../config/colors";
import { supabase } from "../../config/supabase";

import styles from "./styles/PortfolioScreen.styles";

export default function PortfolioScreen() {
  const toast = useToast();
  const navigation = useNavigation();
  const [myStocksLoading, setMyStocksLoading] = useState(false);
  const [totalNetChange, setTotalNetChange] = useState(0);
  const [totalNetPerChange, setTotalNetPerChange] = useState(0);
  const [totalInvestment, setTotalInvestment] = useState(0);
  const [myStocks, setMyStocks] = useState([]);
  const [graphPoints, setGraphPoints] = useState([]);
  const {
    data: liveTrading,
    loading: liveTradingLoading,
    error: liveTradingError,
  } = useFetch(`/nepse/live-trading`);
  const {
    data: marketOpenStatus,
    loading: marketOpenStatusLoading,
    error: marketOpenStatusError,
  } = useFetch("/nepse/status");

  useEffect(() => {
    // get user stocks
    const fetchMyStocks = async () => {
      try {
        setMyStocksLoading(true);
        const user = await supabase.auth.getUser();
        let { data: stocks, error } = await supabase
          .from("portfolio")
          .select("*")
          .eq("user_id", user.data.user.id);

        if (error) {
          console.log("error", error);
          toast.show("Error fetching stocks", {
            type: "danger",
            placement: "top",
            duration: 2000,
          });
        } else {
          setMyStocks(stocks);
          const totalInvestment = stocks.reduce((acc, curr) => {
            liveTrading?.data?.forEach((stock) => {
              if (stock.Symbol === curr.symbol) {
                acc += curr.quantity * parseFloat(stock.LTP.replace(/,/g, ""));
              }
            });
            return acc;
          }, 0);
          const totalNetChange = stocks.reduce((acc, curr) => {
            liveTrading?.data?.forEach((stock) => {
              if (stock.Symbol === curr.symbol) {
                acc += parseFloat(stock["Point Change"].replace(/,/g, ""));
              }
            });
            return acc;
          }, 0);
          const totalNetPerChange = stocks.reduce((acc, curr) => {
            liveTrading?.data?.forEach((stock) => {
              if (stock.Symbol === curr.symbol) {
                acc += parseFloat(stock["% Change"].replace(/,/g, ""));
              }
            });
            return acc;
          }, 0);
          setTotalNetPerChange(totalNetPerChange.toLocaleString());
          setTotalNetChange(totalNetChange.toLocaleString());
          setTotalInvestment(totalInvestment);
        }
        setMyStocksLoading(false);

        // subscribe to portfolio table changes
        const myStocks = supabase
          .channel("table_db_changes")
          .on(
            "postgres_changes",
            {
              event: "*",
              schema: "public",
              table: "portfolio",
            },
            (payload) => {
              setMyStocksLoading(true);
              if (payload.eventType === "INSERT") {
                setMyStocks((prev) => [...prev, payload.new]);
              }
              if (payload.eventType === "UPDATE") {
                setMyStocks((prev) => {
                  const index = prev.findIndex(
                    (item) => item.id === payload.new.id
                  );
                  const newArray = [...prev];
                  newArray[index] = payload.new;
                  return newArray;
                });
              }
              if (payload.eventType === "DELETE") {
                setMyStocks((prev) => {
                  const newArray = prev.filter(
                    (item) => item.id !== payload.old.id
                  );
                  return newArray;
                });
              }
              setMyStocksLoading(false);
            }
          )
          .subscribe();

        return () => {
          myStocks.unsubscribe();
        };
      } catch (error) {
        console.log("error", error);
        toast.show("Something went wrong", {
          type: "danger",
          placement: "top",
          duration: 2000,
        });
        setMyStocksLoading(false);
      }
    };

    fetchMyStocks();
  }, [liveTrading?.data, myStocks?.length]);

  useEffect(() => {
    // store the total investment amount in supabase for today date inside user meta_data
    const storeTotalInvestment = async () => {
      try {
        const user = await supabase.auth.getUser();
        // check if the market is open => if not open then return
        if (!marketOpenStatus?.data?.marketOpen) return;

        // check if the data is already stored in portfolio_graph table for today
        const { data: portfolioGraph, error: portfolioGraphError } =
          await supabase
            .from("portfolio_graph")
            .select("*")
            .eq("user_id", user.data.user.id)
            .eq("date", new Date().toISOString().split("T")[0]);

        if (portfolioGraphError) throw portfolioGraphError;

        if (portfolioGraph.length === 0 && totalInvestment > 0) {
          // store the total investment amount in portfolio_graph table
          const { data, error } = await supabase
            .from("portfolio_graph")
            .insert([
              {
                user_id: user.data.user.id,
                investing: totalInvestment,
                date: new Date().toISOString().split("T")[0],
              },
            ]);
          if (error) throw error;
        }
      } catch (error) {
        console.log("error", error);
      }
    };

    const getGraphPoints = async () => {
      try {
        const user = await supabase.auth.getUser();
        const { data: portfolioGraph, error: portfolioGraphError } =
          await supabase
            .from("portfolio_graph")
            .select("*")
            .eq("user_id", user.data.user.id);

        if (portfolioGraphError) throw portfolioGraphError;

        const graphPoints = portfolioGraph.map((item, index) => {
          return {
            x: index,
            y: item.investing,
          };
        });

        setGraphPoints(graphPoints);
      } catch (error) {
        console.log("error", error);
      }
    };

    storeTotalInvestment();
    getGraphPoints();
  }, [totalInvestment, graphPoints?.length, marketOpenStatus]);

  const fetchStockData = (symbol) => {
    try {
      const stock = liveTrading?.data?.find((stock) => stock.Symbol === symbol);
      return stock;
    } catch (err) {
      console.log(err);
    }
  };

  // handle hold
  const handleHold = (id) => {
    // ask to confirm to delete
    Alert.alert(
      "Delete Stock",
      "Are you sure you want to delete this stock?",
      [
        {
          text: "Cancel",
          onPress: () => {},
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: async () => {
            try {
              setMyStocksLoading(true);
              const { error } = await supabase
                .from("portfolio")
                .delete()
                .eq("id", id);

              if (error) throw error;
              toast.show("Stock deleted successfully", {
                type: "success",
                placement: "top",
                duration: 2000,
              });
              setMyStocksLoading(false);
            } catch (error) {
              console.log("error", error);
              toast.show("Something went wrong", {
                type: "danger",
                placement: "top",
                duration: 2000,
              });
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerInvestmentContainer}>
        <AppText style={styles.headerTitle} variant="Regular">
          Investing
        </AppText>
        <AppText style={styles.headerTotalReturn} variant="Regular">
          Rs. {totalInvestment.toLocaleString()}
        </AppText>
        <AppText
          style={{
            ...styles.netReturnPoint,
            color:
              totalNetChange > 0
                ? colors.dark.graphLineIncrease
                : colors.dark.topLoserText,
          }}
        >
          {totalNetChange} ({totalNetPerChange}%)
        </AppText>
      </View>

      {graphPoints.length > 1 && (
        <View style={styles.chartContainer}>
          <Chart
            style={{
              width: "100%",
              height: Dimensions.get("window").height / 3,
            }}
            data={graphPoints}
            xDomain={{
              min: graphPoints[0].x,
              max: graphPoints[graphPoints.length - 1].x,
            }}
            yDomain={{
              min: 0,
              max: Math.max(...graphPoints.map((item) => item.y)) + 2000,
            }}
          >
            <Area
              style={{ flex: 1 }}
              data={graphPoints}
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
              data={graphPoints}
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
      )}

      {liveTradingLoading ? (
        <ActivityIndicator
          size="large"
          color={colors.dark.button}
          style={{ marginTop: 20 }}
        />
      ) : (
        <View style={styles.stocks}>
          <AppText style={styles.stocksContainerTitle}>Your Stocks</AppText>

          <View style={styles.stocksContainer}>
            {myStocksLoading ? (
              <ActivityIndicator
                size="large"
                color={colors.dark.button}
                style={{ marginTop: 20 }}
              />
            ) : (
              <FlashList
                data={myStocks}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.stock}
                    onPress={() =>
                      navigation.navigate("PortfolioCompany", {
                        symbol: item.symbol,
                      })
                    }
                    activeOpacity={0.6}
                    onLongPress={() => handleHold(item.id)}
                  >
                    <>
                      <View style={styles.stockLeft}>
                        <AppText style={styles.stockName} variant="Medium">
                          {item?.symbol}
                        </AppText>
                        <AppText style={styles.stockUnit} variant="Medium">
                          {item?.quantity} units
                        </AppText>
                      </View>
                      <View style={styles.stockRight}>
                        <AppText style={styles.stockPrice} variant="Medium">
                          Rs.{" "}
                          {item?.quantity *
                            parseFloat(
                              fetchStockData(item?.symbol).LTP.replace(/,/g, "")
                            )}
                        </AppText>
                        <AppText
                          style={{
                            ...styles.stockReturn,
                            color:
                              Number(
                                fetchStockData(item?.symbol)?.["Point Change"]
                              ) > 0
                                ? colors.dark.graphLineIncrease
                                : colors.dark.topLoserText,
                          }}
                          variant="Regular"
                        >
                          {Number(
                            fetchStockData(item?.symbol)?.["Point Change"]
                          ) * item?.quantity}
                        </AppText>
                      </View>
                    </>
                  </TouchableOpacity>
                )}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                estimatedItemSize={myStocks.length === 0 ? 10 : myStocks.length}
                // if item empty
                ListEmptyComponent={() => (
                  <View style={styles.emptyContainer}>
                    <AppText style={styles.emptyText} variant="Regular">
                      No stocks found
                    </AppText>
                  </View>
                )}
                ListFooterComponent={() => <View style={styles.spacer} />}
              />
            )}
          </View>
        </View>
      )}

      <FAB
        style={{
          position: "absolute",
          right: 10,
          bottom: 10,
          backgroundColor: colors.dark.button,
        }}
        icon="plus"
        color={colors.dark.primary}
        onPress={() => navigation.navigate("PortfolioStockScreen")}
      />
    </View>
  );
}
