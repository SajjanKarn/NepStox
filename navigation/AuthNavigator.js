import { StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { height } from "react-native-dimension";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

import colors from "../config/colors";

// tab screens
import HomeScreen from "../screens/HomeScreen";
import MarketScreen from "../screens/MarketScreen";
import MoreScreen from "../screens/MoreScreen";

// stack screens
import TopScreen from "../screens/TopScreen";
import ListedStockScreen from "../screens/ListedStockScreen";
import BrokersScreen from "../screens/BrokersScreen";
import MeroShareScreen from "../screens/MeroShareScreen";
import IndicesScreen from "../screens/IndicesScreen";
import StockComparisonScreen from "../screens/StockComparisonScreen";
import CompanyDetailsScreen from "../screens/CompanyDetailsScreen";
import IPOResultScreen from "../screens/IPOResultScreen";
import CaculatorScreen from "../screens/CalculatorScreen";
import ForeignExchangeScreen from "../screens/ForeignExchangeScreen";
import FloorSheetScreen from "../screens/FloorSheetScreen";

const Tab = createBottomTabNavigator();

const MoreStackNavigator = createStackNavigator();

const stackHeaderStyle = (title = "Title") => ({
  headerTitle: title,
  headerStyle: {
    backgroundColor: colors.dark.secondary,
    elevation: 0,
  },
  headerTintColor: colors.dark.textColor,
});

export const MoreStack = () => (
  <MoreStackNavigator.Navigator initialRouteName="MoreScreen">
    <MoreStackNavigator.Screen
      name="MoreScreen"
      component={MoreScreen}
      options={{
        headerShown: false,
      }}
    />
    <MoreStackNavigator.Screen
      name="TopScreen"
      component={TopScreen}
      options={stackHeaderStyle("Top Trades")}
    />
    <MoreStackNavigator.Screen
      name="ListedStockScreen"
      component={ListedStockScreen}
      options={stackHeaderStyle("Listed Stocks")}
    />
    <MoreStackNavigator.Screen
      name="BrokersScreen"
      component={BrokersScreen}
      options={stackHeaderStyle("Brokers")}
    />
    <MoreStackNavigator.Screen
      name="MeroShareScreen"
      component={MeroShareScreen}
      options={stackHeaderStyle("Mero Share")}
    />
    <MoreStackNavigator.Screen
      name="StockPricesScreen"
      component={MarketScreen}
      options={stackHeaderStyle("Stock Prices")}
    />
    <MoreStackNavigator.Screen
      name="IndicesScreen"
      component={IndicesScreen}
      options={stackHeaderStyle("Market Indices")}
    />
    <MoreStackNavigator.Screen
      name="StockComparisonScreen"
      component={StockComparisonScreen}
      options={stackHeaderStyle("Compare Stocks")}
    />
    <MoreStackNavigator.Screen
      name="IPOResultScreen"
      component={IPOResultScreen}
      options={stackHeaderStyle("IPO Result")}
    />
    <MoreStackNavigator.Screen
      name="CalculatorScreen"
      component={CaculatorScreen}
      options={stackHeaderStyle("Share Calculator")}
    />
    <MoreStackNavigator.Screen
      name="ForeignExchangeScreen"
      component={ForeignExchangeScreen}
      options={stackHeaderStyle("Foreign Exchange")}
    />
    <MoreStackNavigator.Screen
      name="FloorSheetScreen"
      component={FloorSheetScreen}
      options={stackHeaderStyle("Floor Sheet")}
    />
  </MoreStackNavigator.Navigator>
);

export const HomeStack = () => (
  <MoreStackNavigator.Navigator initialRouteName="HomeScreen">
    <MoreStackNavigator.Screen
      name="HomeScreen"
      component={HomeScreen}
      options={{
        headerShown: false,
      }}
    />
    <MoreStackNavigator.Screen
      name="CompanyDetailsScreen"
      component={CompanyDetailsScreen}
      options={stackHeaderStyle("Company Details")}
    />
  </MoreStackNavigator.Navigator>
);

export default function AuthNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={styles.tabNavigator}>
        <Tab.Screen
          name="Home"
          component={HomeStack}
          options={{
            tabBarIcon: ({ color, size }) => (
              <AntDesign name="home" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Portfolio"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <AntDesign name="piechart" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Market"
          component={MarketScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <AntDesign name="linechart" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="WatchList"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <AntDesign name="eye" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="More"
          component={MoreStack}
          options={{
            tabBarIcon: ({ color, size }) => (
              <AntDesign name="bars" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  tabNavigator: {
    headerShown: false,
    tabBarActiveTintColor: colors.dark.button,
    tabBarInactiveTintColor: colors.dark.placeholderText,
    tabBarHideOnKeyboard: true,
    tabBarStyle: {
      backgroundColor: colors.dark.bottomTab,
      borderTopWidth: 0,
      height: height(8),
    },
    tabBarLabelStyle: {
      display: "none",
    },
  },
});
