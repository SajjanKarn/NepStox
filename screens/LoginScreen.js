import { useState } from "react";
import { View, StyleSheet, ScrollView, StatusBar } from "react-native";
import { width, height, totalSize } from "react-native-dimension";
import { useNavigation } from "@react-navigation/native";
import { useToast } from "react-native-toast-notifications";
import { ActivityIndicator } from "react-native-paper";
import { Formik } from "formik";
import * as Yup from "yup";

// components
import AppText from "../components/AppText";
import AppButton from "../components/AppButton";
import AppInput from "../components/AppInput";

import colors from "../config/colors";

// supabase ⚡
import { supabase } from "../config/supabase";

export default function LoginScreen() {
  const navigation = useNavigation();
  const toast = useToast();
  const [loading, setLoading] = useState(false);

  const validationSchema = Yup.object().shape({
    email: Yup.string().email().required("Email is required").label("Email"),
    password: Yup.string().required("Password is required").label("Password"),
  });

  const handleLogin = async (values) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });

      if (error)
        toast.show(error.message, {
          type: "danger",
          duration: 1000,
          placement: "top",
        });
      setLoading(false);
    } catch (error) {
      toast.show("Something went wrong", {
        type: "danger",
        duration: 1000,
        placement: "top",
      });
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <StatusBar barStyle="default" />
      <AppText style={styles.screenTitle} variant="Bold">
        Login
      </AppText>

      <View style={styles.formContainer}>
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={(values) => handleLogin(values)}
          validationSchema={validationSchema}
        >
          {({
            handleChange,
            handleSubmit,
            errors,
            setFieldTouched,
            values,
          }) => (
            <>
              <AppInput
                placeholder="abc@example.com"
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={handleChange("email")}
                onBlur={() => setFieldTouched("email")}
                value={values.email}
              />
              {errors.email && (
                <AppText style={styles.error}>{errors.email}</AppText>
              )}
              <AppInput
                placeholder="Enter Password"
                secureTextEntry={true}
                onChangeText={handleChange("password")}
                onBlur={() => setFieldTouched("password")}
                value={values.password}
              />
              {errors.password && (
                <AppText style={styles.error}>{errors.password}</AppText>
              )}
              <View style={{ height: height(1) }} />
              {loading ? (
                <ActivityIndicator color={colors.dark.button} size="small" />
              ) : (
                <AppButton onPress={handleSubmit}>Login</AppButton>
              )}

              <View style={styles.forgotPasswordContainer}>
                <AppText style={styles.forgotText}>Forgot Password?</AppText>
              </View>

              <View style={styles.forgotPasswordContainer}>
                <AppText
                  style={styles.forgotText}
                  onPress={() => navigation.navigate("RegisterScreen")}
                >
                  Don't have an account? Register
                </AppText>
              </View>
            </>
          )}
        </Formik>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.dark.primary,
    paddingHorizontal: width(5),
    paddingVertical: height(10),
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
  forgotPasswordContainer: {
    alignItems: "center",
    marginTop: height(1),
  },
  forgotText: {
    color: colors.dark.placeholderText,
    fontFamily: "Riveruta-Medium",
    fontSize: totalSize(1.8),
  },
  error: {
    color: colors.dark.topLoserText,
    fontSize: totalSize(1.5),
    marginVertical: height(0.5),
  },
});
