import { useState } from "react";
import { View, StatusBar, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { width } from "react-native-dimension";
import { DataTable } from "react-native-paper";
import { FlashList } from "@shopify/flash-list";

import AppText from "../components/AppText";
import AppInput from "../components/AppInput";
import Loader from "../components/Loader";

import useFetch from "../hooks/useFetch";
import styles from "../styles/MarketScreen.styles";
import colors from "../config/colors";

export default function MarketScreen() {
  const { data, loading, error } = useFetch(`/nepse/live-trading`);
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

  const [searchLoading, setSearchLoading] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [clickedStatus, setStatus] = useState("all");

  const handleSearch = (text) => {
    setSearchLoading(true);
    setSearchInput(text);
    if (text.length > 0) {
      const results = data?.data?.filter((stock) => {
        return stock?.Symbol?.toLowerCase().includes(text.toLowerCase());
      });
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
    setSearchLoading(false);
  };

  const handleStatusChange = (status) => {
    if (status === clickedStatus) {
      setStatus("all");
      setSearchResults([]);
    } else if (status === "advanced") {
      // map through data and return only advanced stocks
      const results = data?.data?.filter((stock) => {
        return Number(stock["Point Change"]) > 0;
      });
      setStatus("advanced");
      setSearchResults(results);
    } else if (status === "declined") {
      // map through data and return only declined stocks
      const results = data?.data?.filter((stock) => {
        return Number(stock["Point Change"]) < 0;
      });
      setStatus("declined");
      setSearchResults(results);
    } else if (status === "unchanged") {
      // map through data and return only unchanged stocks
      const results = data?.data?.filter((stock) => {
        return Number(stock["Point Change"]) === 0;
      });
      setStatus("unchanged");
      setSearchResults(results);
    } else {
      setStatus("all");
      setSearchResults([]);
    }
  };

  return (
    <View style={styles.container_fluid}>
      <View style={{ paddingHorizontal: width(5) }}>
        <StatusBar barStyle="default" />
        <View style={styles.searchContainer}>
          <AppText style={styles.searchTitle}>Search</AppText>
          <AppInput
            placeholder="Symbol or Name..."
            squared
            value={searchInput}
            onChangeText={handleSearch}
            autoCapitalize="none"
          />
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

        {marketStatusLoading ? (
          <Loader />
        ) : (
          <View style={styles.indicators}>
            <TouchableOpacity
              style={[
                styles.indicatorTile,
                styles.advanced,
                {
                  opacity: clickedStatus === "advanced" ? 1 : 0.5,
                },
              ]}
              onPress={() => handleStatusChange("advanced")}
            >
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
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.indicatorTile,
                styles.declined,
                {
                  opacity: clickedStatus === "declined" ? 1 : 0.5,
                },
              ]}
              onPress={() => handleStatusChange("declined")}
            >
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
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.indicatorTile,
                styles.unchanged,
                {
                  opacity: clickedStatus === "unchanged" ? 1 : 0.5,
                },
              ]}
              onPress={() => handleStatusChange("unchanged")}
            >
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
            </TouchableOpacity>
          </View>
        )}
      </View>

      {loading ? (
        <Loader />
      ) : (
        <View style={styles.stocksContainer}>
          <DataTable>
            <DataTable.Header style={styles.tableHeader}>
              <DataTable.Title style={{ flex: 1.5 }}>
                <AppText style={styles.tableHead}>Symbol</AppText>
              </DataTable.Title>
              <DataTable.Title>
                <AppText style={styles.tableHead}>LTP</AppText>
              </DataTable.Title>
              <DataTable.Title>
                <AppText style={styles.tableHead}>High</AppText>
              </DataTable.Title>
              <DataTable.Title>
                <AppText style={styles.tableHead}>Low</AppText>
              </DataTable.Title>
              <DataTable.Title>
                <AppText style={styles.tableHead}>CH</AppText>
              </DataTable.Title>
              <DataTable.Title>
                <AppText style={styles.tableHead}>CH %</AppText>
              </DataTable.Title>
              <DataTable.Title>
                <AppText style={styles.tableHead}>P Close</AppText>
              </DataTable.Title>
            </DataTable.Header>
          </DataTable>

          {loading ? (
            <Loader />
          ) : (
            <FlashList
              data={searchResults.length > 0 ? searchResults : data?.data}
              renderItem={({ item }) => (
                <DataTable.Row
                  style={{
                    backgroundColor:
                      Number(item["Point Change"]) > 0
                        ? colors.dark.stockIncrease + "20"
                        : Number(item["Point Change"]) < 0
                        ? colors.dark.stockDecrease + "20"
                        : null,
                  }}
                >
                  <DataTable.Cell style={{ flex: 1.5 }}>
                    <AppText style={styles.tableCell} variant="Medium">
                      {item.Symbol}
                    </AppText>
                  </DataTable.Cell>
                  <DataTable.Cell>
                    <AppText style={styles.tableCell} variant="Medium">
                      {item.LTP}
                    </AppText>
                  </DataTable.Cell>
                  <DataTable.Cell>
                    <AppText style={styles.tableCell} variant="Medium">
                      {item.High}
                    </AppText>
                  </DataTable.Cell>
                  <DataTable.Cell>
                    <AppText style={styles.tableCell} variant="Medium">
                      {item.Low}
                    </AppText>
                  </DataTable.Cell>
                  <DataTable.Cell>
                    <AppText style={styles.tableCell} variant="Medium">
                      {item["Point Change"]}
                    </AppText>
                  </DataTable.Cell>
                  <DataTable.Cell>
                    <AppText style={styles.tableCell} variant="Medium">
                      {item["% Change"]}
                    </AppText>
                  </DataTable.Cell>
                  <DataTable.Cell>
                    <AppText style={styles.tableCell} variant="Medium">
                      {item["Prev. Close"]}
                    </AppText>
                  </DataTable.Cell>
                </DataTable.Row>
              )}
              keyExtractor={(item) => item.Symbol}
              estimatedItemSize={
                searchResults.length > 0
                  ? searchResults.length
                  : data?.data.length
              }
              ListEmptyComponent={() => (
                <View style={styles.emptyContainer}>
                  <AppText style={styles.emptyText}>No results found</AppText>
                </View>
              )}
            />
          )}
        </View>
      )}
    </View>
  );
}
