import { createStackNavigator } from "@react-navigation/stack";

// screens
import PortfolioScreen from "../../screens/PortfolioScreen";

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
  </PortfolioStack.Navigator>
);

export default PortfolioStackNavigator;
