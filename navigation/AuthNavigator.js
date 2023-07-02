import { useEffect, useRef, useState } from "react";
import { StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { height } from "react-native-dimension";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";

import colors from "../config/colors";

// tab screens
import MarketScreen from "../screens/MarketScreen";

// stacks
import PortfolioStackNavigator from "./Stacks/PortfolioStack";
import HomeStackNavigator from "./Stacks/HomeStack";
import MoreStackNavigator from "./Stacks/MoreStack";
import WatchListStackNavigator from "./Stacks/WatchListStack";

import { supabase } from "../config/supabase";

const Tab = createBottomTabNavigator();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function AuthNavigator() {
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  const storeUserPushToken = async (token) => {
    try {
      const user = await supabase.auth.getUser();
      // check if already push token is stored
      if (user.data.user.user_metadata?.push_token) return;

      const { data, error } = await supabase.auth.updateUser({
        data: {
          push_token: token,
        },
      });
      if (error) throw error;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => {
      setExpoPushToken(token);
      storeUserPushToken(token);
    });

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={styles.tabNavigator}>
        <Tab.Screen
          name="Home"
          component={HomeStackNavigator}
          options={{
            tabBarIcon: ({ color, size }) => (
              <AntDesign name="home" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Portfolio"
          component={PortfolioStackNavigator}
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
          component={WatchListStackNavigator}
          options={{
            tabBarIcon: ({ color, size }) => (
              <AntDesign name="eyeo" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="More"
          component={MoreStackNavigator}
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

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert("Must use physical device for Push Notifications");
  }

  return token;
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
