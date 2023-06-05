import { useState } from "react";
import { View, StatusBar, ScrollView } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { width } from "react-native-dimension";
import { DataTable } from "react-native-paper";

import AppText from "../components/AppText";
import AppInput from "../components/AppInput";
import Loader from "../components/Loader";

import useFetch from "../hooks/useFetch";
import colors from "../config/colors";
import styles from "../styles/MarketScreen.styles";

export default function MarketScreen() {
  const { data, loading, error } = useFetch(`/nepse/live-trading`);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);

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
        <Loader />
      ) : (
        <View style={styles.stocksContainer}>
          <ScrollView>
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

              {loading ? (
                <Loader />
              ) : searchResults.length > 0 ? (
                searchResults?.map((item) => (
                  <DataTable.Row key={item.Symbol}>
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
                ))
              ) : (
                data?.data?.map((item) => (
                  <DataTable.Row key={item.Symbol}>
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
                ))
              )}
            </DataTable>
          </ScrollView>
        </View>
      )}
    </View>
  );
}
