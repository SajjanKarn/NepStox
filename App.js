import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useEffect, useState } from "react";
import { ToastProvider } from "react-native-toast-notifications";
import * as NavigationBar from "expo-navigation-bar";
import "react-native-gesture-handler";

// components
import AppText from "./components/AppText";
import colors from "./config/colors";

// supabase
import { supabase } from "./config/supabase";

// screens
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import ListedStockScreen from "./screens/ListedStockScreen";
import TopScreen from "./screens/TopScreen";
import MarketScreen from "./screens/MarketScreen";
import MeroShareScreen from "./screens/MeroShareScreen";
import BrokersScreen from "./screens/BrokersScreen";
import AuthNavigator from "./navigation/AuthNavigator";
import CompanyDetailsScreen from "./screens/CompanyDetailsScreen";
import StockComparisonScreen from "./screens/StockComparisonScreen";
import RegisterScreen from "./screens/RegisterScreen";
import UnAuthNavigator from "./navigation/UnAuthNavigator";

// context
import { AuthContext } from "./provider/AuthProvider";

// SplashScreen.preventAutoHideAsync();

export default function App() {
  const [session, setSession] = useState(null);
  const [fontsLoaded] = useFonts({
    "Riveruta-Bold": require("./assets/fonts/Riveruta-Bold.ttf"),
    "Riveruta-Regular": require("./assets/fonts/Riveruta-Regular.ttf"),
    "Riveruta-Medium": require("./assets/fonts/Riveruta-Medium.ttf"),
    "Riveruta-Light": require("./assets/fonts/Riveruta-Light.ttf"),
    "Riveruta-Thin": require("./assets/fonts/Riveruta-Thin.ttf"),
  });
  NavigationBar.setBackgroundColorAsync(colors.dark.bottomTab);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ToastProvider>
      {/* //{" "}
      <View style={styles.container} onLayout={onLayoutRootView}>
        // <AppText>Hello World from sajjan!</AppText>
        // <StatusBar style="auto" />
        //{" "}
      </View> */}
      {/* <LoginScreen /> */}
      {/* <RegisterScreen /> */}
      {/* // <HomeScreen />
      // <ListedStockScreen />
      // <TopScreen />
      // <MarketScreen />
      // <MeroShareScreen />
      // <BrokersScreen />
      // <CompanyDetailsScreen />
      // <StockComparisonScreen />
      // <AuthNavigator /> */}
      {session && session.user ? (
        <AuthContext>
          <AuthNavigator />
        </AuthContext>
      ) : (
        <UnAuthNavigator />
      )}
    </ToastProvider>
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
