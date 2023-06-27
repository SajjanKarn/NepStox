import { createStackNavigator } from "@react-navigation/stack";

// screens
import CompanyDetailsScreen from "../../screens/CompanyDetailsScreen";
import ListedStockScreen from "../../screens/ListedStockScreen";
import ChangePasswordScreen from "../../screens/UserSettingScreens/ChangePasswordScreen";
import AboutScreen from "../../screens/AboutScreen";

import MyDrawer from "../Drawer/Drawer";
import stackHeaderStyle from "../stackHeaderStyle";

const HomeStack = createStackNavigator();

const HomeStackNavigator = () => (
  <HomeStack.Navigator initialRouteName="HomeScreen">
    <HomeStack.Screen
      name="HomeScreen"
      component={MyDrawer}
      options={{
        headerShown: false,
      }}
    />
    <HomeStack.Screen
      name="CompanyDetailsScreen"
      component={CompanyDetailsScreen}
      options={stackHeaderStyle("Company Details")}
    />
    <HomeStack.Screen
      name="HomeListedStockScreen"
      component={ListedStockScreen}
      options={stackHeaderStyle("")}
    />
    <HomeStack.Screen
      name="ChangePasswordScreen"
      component={ChangePasswordScreen}
      options={stackHeaderStyle("Change Password")}
    />
    <HomeStack.Screen
      name="AboutScreen"
      component={AboutScreen}
      options={stackHeaderStyle("About NepStoX")}
    />
  </HomeStack.Navigator>
);

export default HomeStackNavigator;
