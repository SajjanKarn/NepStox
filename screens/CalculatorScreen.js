import { useState } from "react";
import { StatusBar, View, useWindowDimensions } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import AppText from "../components/AppText";

import styles from "../styles/TopScreen.styles";

import { BuyScreen, SellScreen, AdjustmentScreen } from "./CalculatorScreens";

const renderScene = SceneMap({
  first: BuyScreen,
  second: SellScreen,
  third: AdjustmentScreen,
});

export default function CaculatorScreen() {
  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "first", title: "Buy" },
    { key: "second", title: "Sell" },
    { key: "third", title: "Adjustment" },
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
