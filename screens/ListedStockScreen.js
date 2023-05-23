import { View, ActivityIndicator, StatusBar, FlatList } from "react-native";
import AppText from "../components/AppText";

import styles from "../styles/ListedStockScreen.styles";
import AppInput from "../components/AppInput";
import StockList from "../components/StockList";
import useFetch from "../hooks/useFetch";

export default function ListedStockScreen() {
  const { data, loading, error } = useFetch(`/nepse/live-trading`);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="default" />
      <View style={styles.searchContainer}>
        <AppText style={styles.searchTitle}>Search</AppText>
        <AppInput placeholder="Symbol or Name..." squared />
      </View>

      {loading ? (
        <ActivityIndicator size="large" color={colors.dark.button} />
      ) : (
        <View style={styles.stocksContainer}>
          <FlatList
            data={data?.data}
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
                }}
              />
            )}
          />
        </View>
      )}
    </View>
  );
}
