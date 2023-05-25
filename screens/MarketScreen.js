import { useEffect, useState } from "react";
import {
  View,
  ActivityIndicator,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from "react-native";
import { FlashList } from "@shopify/flash-list";
import { AntDesign } from "@expo/vector-icons";
import { Table, Row, Rows } from "react-native-table-component";
import { width } from "react-native-dimension";

import AppText from "../components/AppText";
import AppInput from "../components/AppInput";
import StockList from "../components/StockList";

import useFetch from "../hooks/useFetch";
import colors from "../config/colors";
import styles from "../styles/MarketScreen.styles";

export default function MarketScreen() {
  const { data, loading, error } = useFetch(`/nepse/live-trading`);
  const [marketData, setMarketData] = useState({
    tableHead: ["Symbol", "LTP", "High", "Low", "CH", "CH %", "P Close"],
    tableData: [
      ["NABIL", "10.00", "10.00", "10.00", "10.00", "10.00", "10.00"],
      ["RBB", "10.00", "10.00", "10.00", "10.00", "10.00", "10.00"],
      ["NIC ASIA", "10.00", "10.00", "10.00", "10.00", "10.00", "10.00"],
      ["NICA", "10.00", "10.00", "10.00", "10.00", "10.00", "10.00"],
    ],
  });
  const [searchInput, setSearchInput] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  const handleInputChange = (text) => {
    setSearchInput(text);
    if (text.length > 0) {
      // filter and format the result data according to the table
      const result = data.data
        .filter((item) => {
          return item.Symbol.toLowerCase().includes(text.toLowerCase());
        })
        .map((item, index) => [
          item.Symbol,
          parseInt(item.LTP).toFixed(1),
          parseInt(item.High).toFixed(1),
          parseInt(item.Low).toFixed(1),
          parseInt(item["Point Change"]).toFixed(1),
          parseInt(item["% Change"]).toFixed(1),
          parseInt(item["Prev. Close"]).toFixed(1),
        ]);

      setSearchResult(result);
    } else {
      setSearchResult([]);
    }
  };

  useEffect(() => {
    if (data?.data?.length > 0) {
      // get only 5 data
      const tableData = data.data.map((item, index) => [
        item.Symbol,
        parseInt(item.LTP).toFixed(1),
        parseInt(item.High).toFixed(1),
        parseInt(item.Low).toFixed(1),
        parseInt(item["Point Change"]).toFixed(1),
        parseInt(item["% Change"]).toFixed(1),
        parseInt(item["Prev. Close"]).toFixed(1),
      ]);
      setMarketData((prev) => ({ ...prev, tableData }));
    }
  }, [data, loading, error]);

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
            onChangeText={handleInputChange}
            autoCapitalize="none"
          />
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
      </View>

      {loading ? (
        <ActivityIndicator size="large" color={colors.dark.button} />
      ) : (
        <View style={styles.stocksContainer}>
          {marketData.tableData.length > 0 && (
            <ScrollView>
              <Table
                borderStyle={styles.gainerTableBorder}
                style={styles.gainerTable}
              >
                <Row
                  data={marketData.tableHead}
                  style={styles.head}
                  textStyle={styles.headText}
                />
                <Rows
                  data={
                    searchInput.length > 0 ? searchResult : marketData.tableData
                  }
                  textStyle={styles.text}
                />
              </Table>
            </ScrollView>
          )}
        </View>
      )}
    </View>
  );
}
