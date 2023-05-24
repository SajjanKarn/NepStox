import { useState } from "react";
import { StatusBar, View, useWindowDimensions } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import AppText from "../components/AppText";

import styles from "../styles/TopScreen.styles";

import {
  TopGainers,
  TopLosers,
  TopTurnovers,
  TopTradedShares,
  TopTransactions,
} from "./TopScreens";

const renderScene = SceneMap({
  first: TopGainers,
  second: TopLosers,
  third: TopTurnovers,
  fourth: TopTradedShares,
  fifth: TopTransactions,
});

export default function TopScreen() {
  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "first", title: "Top Gainers" },
    { key: "second", title: "Top Losers" },
    { key: "third", title: "Top Turnovers" },
    { key: "fourth", title: "Top Traded Shares" },
    { key: "fifth", title: "Top Transactions" },
  ]);

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={styles.indicator}
      style={styles.tabBar}
      renderLabel={({ route, focused, color }) => (
        <AppText variant="Medium" style={styles.tabTitle}>
          {route.title}
        </AppText>
      )}
      scrollEnabled
    />
  );

  return (
    <>
      <StatusBar style="auto" />
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={renderTabBar}
      />
    </>
  );
}
