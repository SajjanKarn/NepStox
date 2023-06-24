import { createStackNavigator } from "@react-navigation/stack";

// screens
import PortfolioScreen from "../../screens/PortfolioScreens/PortfolioScreen";
import PortfolioStockScreen from "../../screens/PortfolioScreens/PortfolioStockScreen";

import stackHeaderStyle from "../stackHeaderStyle";

const PortfolioStack = createStackNavigator();

const PortfolioStackNavigator = () => (
  <PortfolioStack.Navigator initialRouteName="PortfolioScreen">
    <PortfolioStack.Screen
      name="PortfolioScreen"
      component={PortfolioScreen}
      options={{
        headerShown: false,
      }}
    />
    <PortfolioStack.Screen
      name="PortfolioStockScreen"
      component={PortfolioStockScreen}
      options={stackHeaderStyle("Select Stock")}
    />
  </PortfolioStack.Navigator>
);

export default PortfolioStackNavigator;
