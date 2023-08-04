import { useState } from "react";
import { View, ActivityIndicator, StatusBar } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { useNavigation } from "@react-navigation/native";

import AppText from "../components/AppText";
import AppInput from "../components/AppInput";
import StockList from "../components/StockList";

import useFetch from "../hooks/useFetch";
import colors from "../config/colors";
import styles from "../styles/ListedStockScreen.styles";

import { storeStock } from "../config/storage";

export default function SelectStockScreen() {
  const navgation = useNavigation();
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

  const handlePress = async (symbol) => {
    await storeStock(symbol);
    navgation.navigate("WatchListScreen", {
      refresh: true,
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="default" />
      <View style={styles.searchContainer}>
        <AppText style={styles.searchTitle}>Search</AppText>
        {!loading && (
          <AppInput
            placeholder="Symbol or Name..."
            squared
            value={searchInput}
            onChangeText={handleInputChange}
            autoCapitalize="none"
          />
        )}
      </View>

      {loading ? (
        <ActivityIndicator size="large" color={colors.dark.button} />
      ) : error ? (
        <AppText style={styles.errorText}>Something went wrong!</AppText>
      ) : (
        <View style={styles.stocksContainer}>
          <FlashList
            data={searchResult.length > 0 ? searchResult : data?.data}
            keyExtractor={(item) => item.Symbol}
            showsVerticalScrollIndicator={false}
            estimatedItemSize={150}
            renderItem={({ item }) => (
              <StockList
                touchable
                onPress={() => handlePress(item.Symbol)}
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
  );
}
