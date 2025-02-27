import { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Alert,
  RefreshControl,
} from "react-native";
import { width, height, totalSize } from "react-native-dimension";
import { useNavigation } from "@react-navigation/native";
import {
  ActivityIndicator,
  DataTable,
  FAB,
  TextInput,
} from "react-native-paper";

import AppText from "../components/AppText";
import Loader from "../components/Loader";
import useFetch from "../hooks/useFetch";

import colors from "../config/colors";
import { getStock, removeSingleStock } from "../config/storage";

export default function WatchListScreen({ route }) {
  const navigation = useNavigation();
  const [searchInput, setSearchInput] = useState("");
  const [watchListStocks, setWatchListStocks] = useState([]);
  const [watchListLoading, setWatchListLoading] = useState(false);
  const { data, loading, error } = useFetch(`/nepse/live-trading`);
  const {
    data: marketOpenStatus,
    loading: marketOpenStatusLoading,
    error: marketOpenStatusError,
  } = useFetch("/nepse/status");

  const getData = async () => {
    setWatchListLoading(true);
    const stocks = await getStock();

    if (stocks && !loading) {
      const result = data?.data?.filter((item) => stocks.includes(item.Symbol));
      setWatchListStocks(result);
    }

    setWatchListLoading(false);
  };

  const handleRefresh = async () => {
    setWatchListLoading(true);
    const stocks = await getStock();

    const result = data?.data?.filter((item) => stocks.includes(item.Symbol));
    setWatchListStocks(result);

    setWatchListLoading(false);
  };

  useEffect(() => {
    if (route.params?.refresh || !loading) {
      if (route.params?.refresh) {
        navigation.setParams({ refresh: undefined });
      }
      getData();
    }
  }, [loading, route.params?.refresh]);

  const handleHold = async (symbol) => {
    // ask for confirmation
    Alert.alert(
      "Are you sure you want to remove this stock?",
      "This will remove the stock from your watchlist.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Remove",
          onPress: () => handleRemove(symbol),
        },
      ]
    );
  };

  const handleRemove = async (symbol) => {
    const newStocks = await removeSingleStock(symbol);

    if (newStocks.length === 0) {
      setWatchListStocks([]);
    } else {
      const result = data?.data?.filter((item) =>
        newStocks.includes(item.Symbol)
      );
      setWatchListStocks(result);
    }
  };

  const handleSearch = (text) => {
    setSearchInput(text);
    if (text.length > 0) {
      const result = watchListStocks.filter((item) =>
        item.Symbol.toLowerCase().includes(text.toLowerCase())
      );
      setWatchListStocks(result);
    } else {
      getData();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <AppText style={styles.searchTitle}>Search</AppText>
        <View style={styles.searchInputContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Symbol or Name..."
            placeholderTextColor={colors.dark.textColor}
            onChangeText={(text) => handleSearch(text)}
            value={searchInput}
            activeUnderlineColor={colors.dark.placeholderText}
            textColor={colors.dark.textColor}
            autoCapitalize="none"
          />
        </View>
      </View>

      {marketOpenStatusLoading ? (
        <Loader margin={10} />
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

      {!searchInput.length && watchListStocks.length === 0 && (
        <View style={styles.noStocksContainer}>
          <AppText style={styles.noStocksTitle} variant="Medium">
            Click on the + button to add stocks to your watchlist
          </AppText>
        </View>
      )}

      {searchInput.length > 0 && watchListStocks.length === 0 && (
        <View style={styles.noStocksContainer}>
          <AppText style={styles.noStocksTitle} variant="Medium">
            No stocks found
          </AppText>
        </View>
      )}

      {watchListLoading ? (
        <ActivityIndicator
          animating={true}
          color={colors.dark.button}
          size="small"
        />
      ) : (
        watchListStocks.length > 0 && (
          <DataTable
            style={{
              flex: 1,
              marginTop: 10,
            }}
          >
            <DataTable.Header
              style={{
                backgroundColor: colors.dark.bottomTab,
                borderBottomColor: colors.dark.bottomTab,
              }}
            >
              <DataTable.Title>
                <AppText style={styles.tableTitle}>Symbol</AppText>
              </DataTable.Title>
              <DataTable.Title numeric>
                <AppText style={styles.tableTitle}>LTP</AppText>
              </DataTable.Title>
              <DataTable.Title numeric>
                <AppText style={styles.tableTitle}>CH</AppText>
              </DataTable.Title>
              <DataTable.Title numeric>
                <AppText style={styles.tableTitle}>% CH</AppText>
              </DataTable.Title>
            </DataTable.Header>

            <FlatList
              data={watchListStocks}
              keyExtractor={(item) => item.Symbol}
              refreshControl={
                <RefreshControl
                  refreshing={loading}
                  onRefresh={() => handleRefresh()}
                />
              }
              renderItem={({ item }) => (
                <DataTable.Row
                  key={item.Symbol}
                  style={{
                    backgroundColor:
                      Number(item["Point Change"]) > 0
                        ? colors.dark.stockIncrease
                        : colors.dark.stockDecrease,
                  }}
                  // handle hold press
                  onLongPress={() => handleHold(item.Symbol)}
                  onPress={() =>
                    navigation.navigate("CompanyDetailsScreen", {
                      symbol: item.Symbol,
                    })
                  }
                >
                  <DataTable.Cell>
                    <AppText style={styles.tableText}>{item.Symbol}</AppText>
                  </DataTable.Cell>
                  <DataTable.Cell numeric>
                    <AppText style={styles.tableText}>{item.LTP}</AppText>
                  </DataTable.Cell>
                  <DataTable.Cell numeric>
                    <AppText style={styles.tableText}>
                      {item["Point Change"]}
                    </AppText>
                  </DataTable.Cell>
                  <DataTable.Cell numeric>
                    <AppText style={styles.tableText}>
                      {item["% Change"]}%
                    </AppText>
                  </DataTable.Cell>
                </DataTable.Row>
              )}
              showsVerticalScrollIndicator={false}
              bounces={false}
            />
          </DataTable>
        )
      )}

      <FAB
        style={styles.fab}
        size="medium"
        icon="plus"
        onPress={() => navigation.navigate("SelectStockScreen")}
        color={colors.dark.primary}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.dark.primary,
    paddingHorizontal: width(5),
    paddingTop: height(2),
  },

  // search bar
  searchContainer: {
    marginVertical: height(0.5),
  },
  searchTitle: {
    fontSize: totalSize(2),
    color: colors.dark.button,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  searchInput: {
    backgroundColor: colors.dark.secondary,
    marginVertical: height(0.5),
    borderTopEndRadius: width(1),
    borderTopStartRadius: width(1),
  },

  // market status
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

  // fab
  fab: {
    position: "absolute",
    backgroundColor: colors.dark.button,
    margin: 16,
    right: 0,
    bottom: 0,
  },

  // no stocks
  noStocksContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noStocksTitle: {
    fontSize: totalSize(2),
    color: colors.dark.button,
    textAlign: "center",
  },

  // table
  tableTitle: {
    color: colors.dark.button,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  tableText: {
    fontSize: totalSize(1.3),
  },
});
