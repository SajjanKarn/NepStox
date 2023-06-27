import { useContext, useState } from "react";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { View, StyleSheet, ImageBackground } from "react-native";
import { width, height, totalSize } from "react-native-dimension";
import { ActivityIndicator, Avatar, List } from "react-native-paper";

import AppText from "./AppText";
import colors from "../config/colors";

import AuthProvider from "../provider/AuthProvider";

// supabase
import { supabase } from "../config/supabase";

export default function CustomDrawer(props) {
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthProvider);

  const handleLogout = () => {
    setLoading(true);
    supabase.auth
      .signOut()
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  return (
    <View style={styles.container}>
      <DrawerContentScrollView>
        <ImageBackground
          source={{
            uri: "https://images.pexels.com/photos/6770610/pexels-photo-6770610.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
          }}
          style={styles.imageBackground}
        >
          <Avatar.Text
            size={totalSize(10)}
            label={user && user.email[0].toUpperCase()}
            style={styles.avatar}
          />
          {user && <AppText style={styles.userEmail}>{user.email}</AppText>}
        </ImageBackground>

        <List.Accordion
          title="About App"
          titleStyle={styles.titleStyle}
          rippleColor={colors.dark.button + 50}
          left={(props) => (
            <List.Icon
              {...props}
              icon="information-outline"
              color={colors.dark.textColor}
            />
          )}
          style={styles.accordin}
        >
          <List.Item
            title="About Us"
            titleStyle={styles.titleStyle}
            onPress={() => props.navigation.navigate("AboutScreen")}
          />
          <List.Item title="Privacy Policy" titleStyle={styles.titleStyle} />
          <List.Item title="Terms & Condition" titleStyle={styles.titleStyle} />
          <List.Item title="Rate Us" titleStyle={styles.titleStyle} />
        </List.Accordion>
        {loading ? (
          <ActivityIndicator
            animating={true}
            color={colors.dark.button}
            size="small"
            style={{ marginTop: height(5) }}
          />
        ) : (
          <List.Accordion
            title="User Settings"
            titleStyle={styles.titleStyle}
            rippleColor={colors.dark.button + 50}
            left={(props) => (
              <List.Icon
                {...props}
                // user icon
                icon="account"
                color={colors.dark.textColor}
              />
            )}
            style={styles.accordin}
          >
            <List.Item
              title="Change Password"
              titleStyle={styles.titleStyle}
              onPress={() => props.navigation.navigate("ChangePasswordScreen")}
            />
            <List.Item
              title="Logout"
              titleStyle={styles.titleStyle}
              onPress={handleLogout}
            />
          </List.Accordion>
        )}
      </DrawerContentScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.dark.primary,
  },
  imageBackground: {
    width: "100%",
    height: height(20),
    justifyContent: "center",
    alignItems: "center",
  },
  // avatar
  avatar: {
    marginBottom: height(1),
  },
  userEmail: {
    color: colors.dark.button,
    fontSize: totalSize(1.8),
    fontFamily: "Riveruta-Bold",
    marginVertical: height(1),
  },
  // accordin
  accordin: {
    backgroundColor: colors.dark.primary,
    borderBottomWidth: 1,
    borderBottomColor: colors.dark.placeholderText,
  },
  titleStyle: {
    fontFamily: "Riveruta-Regular",
    color: colors.dark.textColor,
  },
});
