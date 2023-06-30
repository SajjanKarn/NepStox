import { View, StyleSheet } from "react-native";
import { width, height, totalSize } from "react-native-dimension";
import { Formik } from "formik";
import * as Yup from "yup";

import AppText from "../components/AppText";
import AppInput from "../components/AppInput";
import colors from "../config/colors";
import AppButton from "../components/AppButton";

import { supabase } from "../config/supabase";
import { useToast } from "react-native-toast-notifications";
import { useState } from "react";
import { ActivityIndicator } from "react-native-paper";

export default function ResetPasswordScreen() {
  const toast = useToast();
  const [loading, setLoading] = useState(false);

  const validateSchema = Yup.object().shape({
    email: Yup.string().email().required("Email is required").label("Email"),
  });

  const handleResetPassword = async (values) => {
    try {
      setLoading(true);

      const { data, error } = await supabase.auth.resetPasswordForEmail(
        values.email
      );

      if (error) {
        toast.show(error.message, {
          type: "danger",
          duration: 1000,
          placement: "top",
        });
        setLoading(false);
        return;
      }

      toast.show("Reset password link sent to your email", {
        type: "success",
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
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <AppText style={styles.headerTitle} variant="Medium">
        Forgot Password ?
      </AppText>
      <AppText style={styles.headerSubtitle} variant="Regular">
        Enter your email address to reset your password
      </AppText>

      <View style={styles.formContainer}>
        <Formik
          initialValues={{ email: "" }}
          onSubmit={(values) => handleResetPassword(values)}
          validationSchema={validateSchema}
        >
          {({
            handleChange,
            handleSubmit,
            errors,
            setFieldTouched,
            touched,
          }) => (
            <>
              <AppInput
                placeholder="abc@example.com"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                squared
                onChangeText={handleChange("email")}
                onBlur={() => setFieldTouched("email")}
              />
              {errors.email && touched.email && (
                <AppText style={styles.error}>{errors.email}</AppText>
              )}

              {loading ? (
                <ActivityIndicator
                  size="small"
                  color={colors.dark.button}
                  style={{ marginTop: height(2) }}
                />
              ) : (
                <AppButton squared onPress={handleSubmit}>
                  Reset Password
                </AppButton>
              )}
            </>
          )}
        </Formik>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.dark.primary,
    paddingHorizontal: width(5),
    paddingTop: height(2),
  },
  headerTitle: {
    fontSize: totalSize(3),
    color: colors.dark.textColor,
    marginBottom: height(1),
  },
  headerSubtitle: {
    fontSize: totalSize(1.8),
    color: colors.dark.placeholderText,
    marginTop: height(1),
    maxWidth: width(70),
    marginBottom: height(2),
  },
  error: {
    color: colors.dark.topLoserText,
  },
});
