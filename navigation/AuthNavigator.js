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
  </MoreStackNavigator.Navigator>
);

export default function AuthNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={styles.tabNavigator}>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
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
