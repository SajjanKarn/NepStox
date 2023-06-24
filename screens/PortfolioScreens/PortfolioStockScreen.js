import { useState } from "react";
import { View, StatusBar, StyleSheet, ScrollView } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { useNavigation } from "@react-navigation/native";
import {
  Modal,
  Portal,
  Button,
  PaperProvider,
  ActivityIndicator,
} from "react-native-paper";
import { height, totalSize, width } from "react-native-dimension";
import { Picker } from "@react-native-picker/picker";
import { Formik } from "formik";
import * as Yup from "yup";

import AppText from "../../components/AppText";
import AppInput from "../../components/AppInput";
import StockList from "../../components/StockList";

import useFetch from "../../hooks/useFetch";
import styles from "../../styles/ListedStockScreen.styles";
import colors from "../../config/colors";

import { supabase } from "../../config/supabase";
import { useToast } from "react-native-toast-notifications";

export default function PortfolioStockScreen() {
  const toast = useToast();
  const navgation = useNavigation();
  const { data, loading, error } = useFetch(`/nepse/live-trading`);
  const [searchInput, setSearchInput] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [selectedStock, setSelectedStock] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [addLoading, setAddLoading] = useState(false);
  const [source, setSource] = useState("IPO");
  const [todayDate, setTodayDate] = useState(
    new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  );

  const validateSchema = Yup.object().shape({
    quantity: Yup.number()
      .required()
      .label("Quantity")
      .typeError("Quantity must be a number"),
    buyingPrice: Yup.number()
      .required()
      .label("Buying Price")
      .typeError("Buying Price must be a number"),
  });

  const handleInputChange = (text) => {
    setSearchInput(text);
    if (text.length > 0) {
      const result = data?.data?.filter((item) =>
        item.Symbol.toLowerCase().includes(text.toLowerCase())
      );
      setSearchResult(result);
    } else {
      setSearchResult([]);
    }
  };

  const handlePress = async (symbol) => {
    setSelectedStock(symbol);
    setModalVisible(true);
  };

  const handlePortfolioSubmit = async (values) => {
    try {
      setAddLoading(true);
      const user = await supabase.auth.getUser();
      // before inserting check if the stock is already in portfolio
      const { data: portfolioData, error: portfolioError } = await supabase
        .from("portfolio")
        .select("*")
        .eq("user_id", user.data.user.id)
        .eq("symbol", selectedStock);
      if (portfolioError) {
        throw portfolioError;
      }
      if (portfolioData.length > 0) {
        toast.show("Stock already in portfolio!", {
          type: "danger",
          placement: "top",
          duration: 3000,
        });
        setAddLoading(false);
        return;
      }

      const { data: portfolio, error } = await supabase
        .from("portfolio")
        .insert([
          {
            user_id: user.data.user.id,
            symbol: selectedStock,
            source,
            quantity: Number(values.quantity),
            buying_price: Number(values.buyingPrice),
            buying_date: new Date(),
          },
        ]);
      if (error) {
        throw error;
      }
      setAddLoading(false);
      setModalVisible(false);
      toast.show("Stock added to portfolio!", {
        type: "success",
        placement: "top",
        duration: 3000,
      });
      navgation.navigate("PortfolioScreen");
    } catch (error) {
      console.log(error);
      toast.show("Something went wrong!", {
        type: "danger",
        placement: "top",
        duration: 3000,
      });
      setAddLoading(false);
    }
  };

  return (
    <PaperProvider>
      <View style={styles.container}>
        <StatusBar barStyle="default" />
        <View style={styles.searchContainer}>
          <AppText style={styles.searchTitle}>Search</AppText>
          <AppInput
            placeholder="Symbol or Name..."
            squared
            value={searchInput}
            onChangeText={handleInputChange}
            autoCapitalize="none"
          />
        </View>

        {loading ? (
          <ActivityIndicator size="large" color={colors.dark.button} />
        ) : error ? (
          <AppText style={screenStyles.errorText}>
            Something went wrong!
          </AppText>
        ) : (
          <View style={styles.stocksContainer}>
            <FlashList
              data={searchResult.length > 0 ? searchResult : data?.data}
              keyExtractor={(item) => item.Symbol}
              showsVerticalScrollIndicator={false}
              estimatedItemSize={150}
              renderItem={({ item }) => (
                <StockList
                  touchable
                  onPress={() => handlePress(item.Symbol)}
                  stock={{
                    symbol: item.Symbol,
                    ltp: item.LTP,
                    companyName: "Apple Inc.",
                    change_pts: item["Point Change"],
                    change_per: item["% Change"],
                    prev_close: item["Prev. Close"],
                  }}
                />
              )}
            />
          </View>
        )}

        {selectedStock && modalVisible && (
          <Portal>
            <Modal
              visible={modalVisible}
              onDismiss={() => setModalVisible(false)}
              contentContainerStyle={screenStyles.modalContainer}
            >
              <ScrollView>
                <AppText style={screenStyles.modalTitle}>
                  {selectedStock}
                </AppText>
                <View style={styles.formContainer}>
                  <Formik
                    initialValues={{ quantity: "", buyingPrice: "" }}
                    onSubmit={(values) => handlePortfolioSubmit(values)}
                    validationSchema={validateSchema}
                  >
                    {({
                      handleChange,
                      handleSubmit,
                      errors,
                      setFieldTouched,
                      touched,
                      values,
                    }) => (
                      <>
                        <View style={styles.pickerContainer}>
                          <AppText style={styles.pickerTitle}>Source</AppText>
                          <Picker
                            selectedValue={source}
                            onValueChange={(itemValue, itemIndex) =>
                              setSource(itemValue)
                            }
                            style={screenStyles.picker}
                            dropdownIconColor={colors.dark.textColor}
                          >
                            <Picker.Item label="IPO" value="IPO" />
                            <Picker.Item
                              label="Secondary Market"
                              value="Secondary Market"
                            />
                          </Picker>
                        </View>

                        <AppInput
                          placeholder="Quantity (units)"
                          squared
                          keyboardType="numeric"
                          autoCapitalize="none"
                          onChangeText={handleChange("quantity")}
                          onBlur={() => setFieldTouched("quantity")}
                          value={values.quantity}
                        />
                        {touched.quantity && errors.quantity && (
                          <AppText style={screenStyles.errorText}>
                            {errors.quantity}
                          </AppText>
                        )}
                        <AppInput
                          placeholder="Buying Price"
                          squared
                          keyboardType="numeric"
                          autoCapitalize="none"
                          onChangeText={handleChange("buyingPrice")}
                          onBlur={() => setFieldTouched("buyingPrice")}
                          value={values.buyingPrice}
                        />
                        {touched.buyingPrice && errors.buyingPrice && (
                          <AppText style={screenStyles.errorText}>
                            {errors.buyingPrice}
                          </AppText>
                        )}
                        <View style={styles.dateInput}>
                          <AppInput
                            placeholder="Date"
                            squared
                            editable={false}
                            value={todayDate}
                          />
                        </View>
                        <View style={screenStyles.modalButtonsContainer}>
                          {addLoading ? (
                            <ActivityIndicator
                              size="small"
                              color={colors.dark.button}
                            />
                          ) : (
                            <Button
                              mode="contained"
                              onPress={handleSubmit}
                              style={screenStyles.modalButton}
                            >
                              Submit
                            </Button>
                          )}
                        </View>
                      </>
                    )}
                  </Formik>
                </View>
              </ScrollView>
            </Modal>
          </Portal>
        )}
      </View>
    </PaperProvider>
  );
}

const screenStyles = StyleSheet.create({
  modalContainer: {
    backgroundColor: colors.dark.primary,
    padding: width(5),
    marginHorizontal: width(3),
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: totalSize(2.5),
    fontWeight: "bold",
    color: colors.dark.textColor,
    marginBottom: height(2),
  },
  picker: {
    color: colors.dark.textColor,
    backgroundColor: colors.dark.secondary,
    borderRadius: 10,
    marginBottom: height(0.5),
  },
  errorText: {
    color: colors.dark.topLoserText,
    fontSize: totalSize(1.5),
    marginBottom: height(1),
  },
});
