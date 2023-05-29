import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { width, height, totalSize } from "react-native-dimension";

// screens
import HomeScreen from "../screens/HomeScreen";
import MarketScreen from "../screens/MarketScreen";

import colors from "../config/colors";
import MoreScreen from "../screens/MoreScreen";

const Tab = createBottomTabNavigator();

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
          component={MoreScreen}
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
