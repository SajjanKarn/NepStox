import { createStackNavigator } from "@react-navigation/stack";

// screens
import SelectStockScreen from "../../screens/SelectStockScreen";
import WatchListScreen from "../../screens/WatchListScreen";
import stackHeaderStyle from "../stackHeaderStyle";

const WatchListStack = createStackNavigator();

const WatchListStackNavigator = () => (
  <WatchListStack.Navigator initialRouteName="WatchListScreen">
    <WatchListStack.Screen
      name="WatchListScreen"
      component={WatchListScreen}
      options={{
        headerShown: false,
      }}
    />
    <WatchListStack.Screen
      name="SelectStockScreen"
      component={SelectStockScreen}
      options={stackHeaderStyle("Select Stock")}
    />
  </WatchListStack.Navigator>
);

export default WatchListStackNavigator;
