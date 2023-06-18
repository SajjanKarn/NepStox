import { useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { width, height, totalSize } from "react-native-dimension";
import { useToast } from "react-native-toast-notifications";
import { ActivityIndicator } from "react-native-paper";
import { StatusBar } from "react-native";
import { useNavigation } from "@react-navigation/native";

// components
import AppText from "../components/AppText";
import AppButton from "../components/AppButton";
import AppInput from "../components/AppInput";

import colors from "../config/colors";

import { supabase } from "../config/supabase";

export default function RegisterScreen() {
  const navigation = useNavigation();
  const toast = useToast();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);

  const handlePress = async () => {
    if (
      !credentials.email ||
      !credentials.password ||
      !credentials.confirmPassword
    ) {
      toast.show("Please fill all the fields", {
        type: "danger",
        duration: 1000,
        placement: "top",
      });
      return;
    }

    const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailReg.test(credentials.email)) {
      toast.show("Please enter a valid email", {
        type: "danger",
        duration: 1000,
        placement: "top",
      });
      return;
    }

    if (credentials.password.length < 6) {
      toast.show("Password must be at least 6 characters", {
        type: "danger",
        duration: 1000,
        placement: "top",
      });
      return;
    }

    if (credentials.password !== credentials.confirmPassword) {
      toast.show("Passwords do not match", {
        type: "danger",
        duration: 1000,
        placement: "top",
      });
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email: credentials.email,
      password: credentials.password,
    });

    if (error) {
      toast.show(error.message, {
        type: "danger",
        duration: 1000,
        placement: "top",
      });
      setLoading(false);
      return;
    }
    setLoading(false);

    toast.show("Account created, check your email for verification", {
      type: "success",
      duration: 2000,
      placement: "top",
    });
  };

  return (
    <ScrollView style={styles.container}>
      <StatusBar barStyle="default" />
      <AppText style={styles.screenTitle} variant="Bold">
        Sign Up An Account
      </AppText>

      <View style={styles.formContainer}>
        <AppInput
          placeholder="abc@example.com"
          onChangeText={(text) =>
            setCredentials({ ...credentials, email: text })
          }
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <AppInput
          placeholder="Enter Password"
          onChangeText={(text) =>
            setCredentials({ ...credentials, password: text })
          }
          secureTextEntry={true}
        />
        <AppInput
          placeholder="Confirm Password"
          onChangeText={(text) =>
            setCredentials({ ...credentials, confirmPassword: text })
          }
          secureTextEntry={true}
        />

        <View style={{ height: height(1) }} />
        {loading ? (
          <ActivityIndicator color={colors.dark.button} size="small" />
        ) : (
          <AppButton onPress={handlePress}>Sign Up</AppButton>
        )}

        <View style={styles.loginTextContainer}>
          <AppText
            style={styles.loginText}
            onPress={() => navigation.navigate("LoginScreen")}
          >
            Already Have an Account? Login
          </AppText>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.dark.primary,
    paddingHorizontal: width(5),
    paddingVertical: height(5),
  },
  screenTitle: {
    fontSize: totalSize(3),
    color: colors.dark.textColor,
  },
  formContainer: {
    marginTop: height(5),
  },
  textInput: {
    backgroundColor: colors.dark.secondary,
    color: colors.dark.textColor,
    fontSize: totalSize(2),
    paddingHorizontal: width(5),
    paddingVertical: height(2),
    borderRadius: totalSize(5),
    marginVertical: height(1),
    fontFamily: "Riveruta-Medium",
  },
  loginTextContainer: {
    alignItems: "center",
    marginTop: height(1),
  },
  loginText: {
    color: colors.dark.placeholderText,
    fontFamily: "Riveruta-Medium",
    fontSize: totalSize(1.8),
  },
});
