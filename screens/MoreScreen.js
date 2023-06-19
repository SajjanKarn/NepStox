import { View, ScrollView, StatusBar } from "react-native";
import { useState } from "react";
import { useToast } from "react-native-toast-notifications";
import { useNavigation } from "@react-navigation/native";

import AppText from "../components/AppText";
import Option from "../components/Option";
import Loader from "../components/Loader";

import styles from "../styles/MoreScreen.styles";

// supabase
import { supabase } from "../config/supabase";

export default function MoreScreen() {
  const navigation = useNavigation();
  const toast = useToast();
  const [loading, setLoading] = useState(false);
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
      {
        name: "My Portfolio",
        icon: "piechart",
        onPress: () => {},
      },
      {
        name: "Logout",
        icon: "logout",
        onPress: () => {
          setLoading(true);
          supabase.auth
            .signOut()
            .then(() => {
              setLoading(false);
            })
            .catch((error) => {
              setLoading(false);
              toast.show("Something went wrong!", {
                type: "danger",
                duration: 1000,
                placement: "top",
              });
            });
        },
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
        onPress: () => navigation.navigate("FloorSheetScreen"),
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
        onPress: () => navigation.navigate("ForeignExchangeScreen"),
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
      {loading && <Loader />}
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
