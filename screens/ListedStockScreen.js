import { useState } from "react";
import {
  View,
  ActivityIndicator,
  StatusBar,
  FlatList,
  TouchableWithoutFeedback,
  Keyboard,
  ToastAndroid,
} from "react-native";
import AppText from "../components/AppText";

import styles from "../styles/ListedStockScreen.styles";
import AppInput from "../components/AppInput";
import StockList from "../components/StockList";
import useFetch from "../hooks/useFetch";

export default function ListedStockScreen() {
  const { data, loading, error } = useFetch(`/nepse/live-trading`);
  const [searchInput, setSearchInput] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  const handleInputChange = (text) => {
    setSearchInput(text);
    if (text.length > 0) {
      const result = data?.data?.filter((item) =>
        item.Symbol.toLowerCase().includes(text.toLowerCase())
      );
      setSearchResult(result);
    } else {
      setSearchResult([]);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
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

        {loading ? (
          <ActivityIndicator size="large" color={colors.dark.button} />
        ) : (
          <View style={styles.stocksContainer}>
            <FlatList
              data={searchResult.length > 0 ? searchResult : data?.data}
              keyExtractor={(item) => item.Symbol}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <StockList
                  stock={{
                    symbol: item.Symbol,
                    ltp: item.LTP,
                    companyName: "Apple Inc.",
                    change_pts: item["Point Change"],
                    change_per: item["% Change"],
                    prev_close: item["Prev. Close"],
                  }}
                />
              )}
            />
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}
