import { View, StyleSheet } from "react-native";
import { width, height, totalSize } from "react-native-dimension";

import AppText from "../components/AppText";
import AppInput from "../components/AppInput";
import colors from "../config/colors";

// supabase ⚡
import { supabase } from "../config/supabase";
import { useContext } from "react";
import AuthProvider from "../provider/AuthProvider";
import { AntDesign } from "@expo/vector-icons";

export default function MyProfileScreen() {
  const { user } = useContext(AuthProvider);

  return (
    <View style={styles.container}>
      <AppText style={styles.headerTitle}>Your Profile Information</AppText>

      <View style={styles.detailsContainer}>
        <View style={styles.detail}>
          <AppText style={styles.detailTitle}>Email</AppText>
          <AppText style={styles.detailValue} variant="Medium">
            {user?.email}
          </AppText>
        </View>
        <View style={styles.detail}>
          <AppText style={styles.detailTitle}>Email Confirmed</AppText>
          <AppText style={styles.detailValue} variant="Medium">
            <AntDesign
              name={user?.email_confirmed_at ? "checkcircle" : "closecircle"}
              size={24}
              color={user?.email_confirmed_at ? "green" : "red"}
            />
          </AppText>
        </View>
        <View style={styles.detail}>
          <AppText style={styles.detailTitle}>Last Signed In</AppText>
          <AppText style={styles.detailValue} variant="Medium">
            {new Date(user?.last_sign_in_at).toLocaleDateString("en-US", {
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            })}
          </AppText>
        </View>
        <View style={styles.detail}>
          <AppText style={styles.detailTitle}>Account Created At</AppText>
          <AppText style={styles.detailValue} variant="Medium">
            {new Date(user?.created_at).toLocaleDateString("en-US", {
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            })}
          </AppText>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.dark.primary,
    paddingHorizontal: width(5),
  },
  headerTitle: {
    fontSize: totalSize(2.5),
    color: colors.dark.textColor,
    marginTop: height(3),
  },

  detailsContainer: {
    marginTop: height(3),
  },
  detail: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: height(2),
    borderBottomWidth: 1,
    borderBottomColor: colors.dark.secondary,
  },
  detailTitle: {
    fontSize: totalSize(1.75),
    color: colors.dark.textColor,
  },
  detailValue: {
    fontSize: totalSize(1.6),
    color: colors.dark.placeholderText,
  },
});
