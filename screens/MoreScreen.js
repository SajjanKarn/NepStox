import { View, ScrollView, StatusBar } from "react-native";
import { useState } from "react";

import AppText from "../components/AppText";
import Option from "../components/Option";

import styles from "../styles/MoreScreen.styles";
import { useNavigation } from "@react-navigation/native";

export default function MoreScreen() {
  const navigation = useNavigation();
  const [options, setOptions] = useState({
    myInformation: [
      {
        name: "Profile",
        icon: "wallet",
        onPress: () => {},
      },
      {
        name: "My WatchList",
        icon: "eye",
        onPress: () => {},
      },
      {
        name: "Odd Lot",
        icon: "home",
        onPress: () => {},
      },
      {
        name: "My Notes",
        icon: "book",
        onPress: () => {},
      },
    ],
    marketInformation: [
      {
        name: "Stock Prices",
        icon: "linechart",
        onPress: () => navigation.navigate("StockPricesScreen"),
      },
      {
        name: "Indices",
        icon: "dotchart",
        onPress: () => navigation.navigate("IndicesScreen"),
      },
      {
        name: "Top Trades",
        icon: "arrowup",
        onPress: () => navigation.navigate("TopScreen"),
      },
      {
        name: "FloorSheet",
        icon: "filetext1",
        onPress: () => {},
      },
      {
        name: "Listed Stocks",
        icon: "bars",
        onPress: () => navigation.navigate("ListedStockScreen"),
      },
      {
        name: "Brokers",
        icon: "team",
        onPress: () => navigation.navigate("BrokersScreen"),
      },
      {
        name: "Compare Stocks",
        icon: "swap",
        onPress: () => navigation.navigate("StockComparisonScreen"),
      },
    ],
    utilities: [
      {
        name: "Calculator",
        icon: "calculator",
        onPress: () => navigation.navigate("CalculatorScreen"),
      },
      {
        name: "Exchange Rates",
        icon: "retweet",
      },
      {
        name: "Reminders",
        icon: "notification",
      },
    ],
    externalLinks: [
      {
        name: "MeroShare",
        icon: "sharealt",
        onPress: () => navigation.navigate("MeroShareScreen"),
      },
      {
        name: "IPO Result",
        icon: "search1",
        onPress: () => navigation.navigate("IPOResultScreen"),
      },
    ],
  });
  return (
    <ScrollView style={styles.container}>
      <StatusBar barStyle="default" />
      {/* my information  */}
      <View style={styles.optionContainer}>
        <AppText style={styles.optionTitle} variant="Bold">
          My Information
        </AppText>

        <View style={styles.options}>
          {options.myInformation.map((item) => (
            <Option item={item} key={item.name} />
          ))}
        </View>
      </View>

      {/* market information  */}
      <View style={styles.optionContainer}>
        <AppText style={styles.optionTitle} variant="Bold">
          Market Information
        </AppText>

        <View style={styles.options}>
          {options.marketInformation.map((item) => (
            <Option item={item} key={item.name} />
          ))}
        </View>
      </View>

      {/* utilities  */}
      <View style={styles.optionContainer}>
        <AppText style={styles.optionTitle} variant="Bold">
          Utilities
        </AppText>

        <View style={styles.options}>
          {options.utilities.map((item) => (
            <Option item={item} key={item.name} />
          ))}
        </View>
      </View>

      {/* external links  */}
      <View style={styles.optionContainer}>
        <AppText style={styles.optionTitle} variant="Bold">
          External Links
        </AppText>

        <View style={styles.options}>
          {options.externalLinks.map((item) => (
            <Option item={item} key={item.name} />
          ))}
        </View>
      </View>
    </ScrollView>
  );
}
