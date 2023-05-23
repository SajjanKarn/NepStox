import { View, ScrollView, ActivityIndicator, StatusBar } from "react-native";
import AppText from "../components/AppText";

import styles from "../styles/ListedStockScreen.styles";
import AppInput from "../components/AppInput";
import StockList from "../components/StockList";
import useFetch from "../hooks/useFetch";

export default function ListedStockScreen() {
  const { data, loading, error } = useFetch(`/nepse/live-trading`);

  console.log(data.data);
  return (
    <View style={styles.container}>
      <StatusBar barStyle="default" />
      <View style={styles.searchContainer}>
        <AppText style={styles.searchTitle}>Search</AppText>
        <AppInput placeholder="Symbol or Name..." />
      </View>

      {loading ? (
        <ActivityIndicator size="large" color={colors.dark.button} />
      ) : (
        <ScrollView
          style={styles.stocksContainer}
          showsVerticalScrollIndicator={false}
        >
          {data?.data?.map((stock) => (
            <StockList
              key={stock.Symbol}
              stock={{
                symbol: stock.Symbol,
                ltp: stock.LTP,
                companyName: "Apple Inc.",
                change_pts: stock["Point Change"],
                change_per: stock["% Change"],
              }}
            />
          ))}
        </ScrollView>
      )}
    </View>
  );
}
