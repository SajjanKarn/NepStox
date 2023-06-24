import { createDrawerNavigator } from "@react-navigation/drawer";
import { totalSize } from "react-native-dimension";
import { Appbar } from "react-native-paper";

// screens
import HomeScreen from "../../screens/HomeScreen";

import CustomDrawer from "../../components/CustomDrawer";
import colors from "../../config/colors";

const Drawer = createDrawerNavigator();

const MyDrawer = ({ navigation }) => (
  <Drawer.Navigator
    initialRouteName="HomeDrawer"
    drawerContent={(props) => <CustomDrawer {...props} />}
    screenOptions={{
      headerRight: () => (
        <Appbar.Action
          icon="magnify"
          onPress={() => navigation.navigate("HomeListedStockScreen")}
          iconColor={colors.dark.textColor}
        />
      ),
      headerStyle: {
        backgroundColor: colors.dark.bottomTab,
        elevation: 0,
      },
      headerTintColor: colors.dark.textColor,
    }}
  >
    <Drawer.Screen
      name="HomeDrawer"
      component={HomeScreen}
      options={{
        headerTitle: "NepStoX",
        headerTitleStyle: {
          fontFamily: "Riveruta-Bold",
          fontSize: totalSize(2.3),
        },
      }}
    />
  </Drawer.Navigator>
);

export default MyDrawer;
