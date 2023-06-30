import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

// screens
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import ResetPasswordScreen from "../screens/ResetPasswordScreen";
import colors from "../config/colors";

export default function UnAuthNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginScreen">
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="RegisterScreen"
          component={RegisterScreen}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="ResetPasswordScreen"
          component={ResetPasswordScreen}
          options={{
            headerTitle: "Reset Password",
            headerStyle: {
              backgroundColor: colors.dark.primary,
              elevation: 0.5,
            },
            headerTintColor: colors.dark.textColor,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
