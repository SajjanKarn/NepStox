import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback } from "react";

// components
import AppText from "./components/AppText";
import colors from "./config/colors";

// screens
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import ListedStockScreen from "./screens/ListedStockScreen";
import TopScreen from "./screens/TopScreen";
import MarketScreen from "./screens/MarketScreen";
import MeroShareScreen from "./screens/MeroShareScreen";
import BrokersScreen from "./screens/BrokersScreen";

// SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    "Riveruta-Bold": require("./assets/fonts/Riveruta-Bold.ttf"),
    "Riveruta-Regular": require("./assets/fonts/Riveruta-Regular.ttf"),
    "Riveruta-Medium": require("./assets/fonts/Riveruta-Medium.ttf"),
    "Riveruta-Light": require("./assets/fonts/Riveruta-Light.ttf"),
    "Riveruta-Thin": require("./assets/fonts/Riveruta-Thin.ttf"),
  });

  // const onLayoutRootView = useCallback(async () => {
  //   if (fontsLoaded) {
  //     await SplashScreen.hideAsync();
  //   }
  // }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    // <View style={styles.container} onLayout={onLayoutRootView}>
    //   <AppText>Hello World from sajjan!</AppText>
    //   <StatusBar style="auto" />
    // </View>
    // <LoginScreen />
    // <HomeScreen />
    // <ListedStockScreen />
    <TopScreen />
    // <MarketScreen />
    // <MeroShareScreen />
    // <BrokersScreen />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.dark.primary,
    alignItems: "center",
    justifyContent: "center",
  },
});
