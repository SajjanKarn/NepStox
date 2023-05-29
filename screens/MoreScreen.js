import { View, ScrollView, StatusBar } from "react-native";
import { useState } from "react";

import AppText from "../components/AppText";
import Option from "../components/Option";

import styles from "../styles/MoreScreen.styles";

export default function MoreScreen() {
  const [options, setOptions] = useState({
    myInformation: [
      {
        name: "Profile",
        icon: "wallet",
      },
      {
        name: "My WatchList",
        icon: "eye",
      },
      {
        name: "Odd Lot",
        icon: "home",
      },
      {
        name: "My Notes",
        icon: "book",
      },
    ],
    marketInformation: [
      {
        name: "Stock Prices",
        icon: "linechart",
      },
      {
        name: "Indices",
        icon: "dotchart",
      },
      {
        name: "Top Trades",
        icon: "arrowup",
      },
      {
        name: "FloorSheet",
        icon: "filetext1",
      },
      {
        name: "Listed Stocks",
        icon: "bars",
      },
      {
        name: "Brokers",
        icon: "team",
      },
      {
        name: "Compare Stocks",
        icon: "swap",
      },
    ],
    utilities: [
      {
        name: "Calculator",
        icon: "calculator",
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
      },
      {
        name: "Discussions",
        icon: "message1",
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
