import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useEffect, useState } from "react";
import { ToastProvider } from "react-native-toast-notifications";
import * as NavigationBar from "expo-navigation-bar";
import "react-native-gesture-handler";

// supabase
import colors from "./config/colors";
import { supabase } from "./config/supabase";

// navigators
import AuthNavigator from "./navigation/AuthNavigator";
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
