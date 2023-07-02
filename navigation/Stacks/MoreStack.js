import { createStackNavigator } from "@react-navigation/stack";

const MoreStack = createStackNavigator();

// screens
import MoreScreen from "../../screens/MoreScreen";
import TopScreen from "../../screens/TopScreen";
import ListedStockScreen from "../../screens/ListedStockScreen";
import BrokersScreen from "../../screens/BrokersScreen";
import MeroShareScreen from "../../screens/MeroShareScreen";
import IndicesScreen from "../../screens/IndicesScreen";
import StockComparisonScreen from "../../screens/StockComparisonScreen";
import IPOResultScreen from "../../screens/IPOResultScreen";
import CaculatorScreen from "../../screens/CalculatorScreen";
import ForeignExchangeScreen from "../../screens/ForeignExchangeScreen";
import FloorSheetScreen from "../../screens/FloorSheetScreen";
import MyProfileScreen from "../../screens/MyProfileScreen";
import MyNotesScreen from "../../screens/MyNotesScreen";
import MarketScreen from "../../screens/MarketScreen";
import NewsScreen from "../../screens/NewsScreen";

import stackHeaderStyle from "../stackHeaderStyle";
import BulkIPOScreen from "../../screens/BulkIPOScreen";

const MoreStackNavigator = () => (
  <MoreStack.Navigator initialRouteName="MoreScreen">
    <MoreStack.Screen
      name="MoreScreen"
      component={MoreScreen}
      options={{
        headerShown: false,
      }}
    />
    <MoreStack.Screen
      name="TopScreen"
      component={TopScreen}
      options={stackHeaderStyle("Top Trades")}
    />
    <MoreStack.Screen
      name="ListedStockScreen"
      component={ListedStockScreen}
      options={stackHeaderStyle("Listed Stocks")}
    />
    <MoreStack.Screen
      name="BrokersScreen"
      component={BrokersScreen}
      options={stackHeaderStyle("Brokers")}
    />
    <MoreStack.Screen
      name="MeroShareScreen"
      component={MeroShareScreen}
      options={stackHeaderStyle("Mero Share")}
    />
    <MoreStack.Screen
      name="StockPricesScreen"
      component={MarketScreen}
      options={stackHeaderStyle("Stock Prices")}
    />
    <MoreStack.Screen
      name="IndicesScreen"
      component={IndicesScreen}
      options={stackHeaderStyle("Market Indices")}
    />
    <MoreStack.Screen
      name="StockComparisonScreen"
      component={StockComparisonScreen}
      options={stackHeaderStyle("Compare Stocks")}
    />
    <MoreStack.Screen
      name="IPOResultScreen"
      component={IPOResultScreen}
      options={stackHeaderStyle("IPO Result")}
    />
    <MoreStack.Screen
      name="CalculatorScreen"
      component={CaculatorScreen}
      options={stackHeaderStyle("Share Calculator")}
    />
    <MoreStack.Screen
      name="ForeignExchangeScreen"
      component={ForeignExchangeScreen}
      options={stackHeaderStyle("Foreign Exchange")}
    />
    <MoreStack.Screen
      name="FloorSheetScreen"
      component={FloorSheetScreen}
      options={stackHeaderStyle("Floor Sheet")}
    />
    <MoreStack.Screen
      name="MyProfileScreen"
      component={MyProfileScreen}
      options={stackHeaderStyle("My Profile")}
    />
    <MoreStack.Screen
      name="MyNotesScreen"
      component={MyNotesScreen}
      options={stackHeaderStyle("My Notes")}
    />
    <MoreStack.Screen
      name="NewsScreen"
      component={NewsScreen}
      options={stackHeaderStyle("Latest News")}
    />
    <MoreStack.Screen
      name="BulkIPOScreen"
      component={BulkIPOScreen}
      options={stackHeaderStyle("Bulk IPO")}
    />
  </MoreStack.Navigator>
);

export default MoreStackNavigator;
