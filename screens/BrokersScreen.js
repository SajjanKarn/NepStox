import { useState } from "react";
import { StatusBar, View } from "react-native";
import { FlashList } from "@shopify/flash-list";

import useFetch from "../hooks/useFetch";

import AppText from "../components/AppText";
import AppInput from "../components/AppInput";
import Loader from "../components/Loader";
import Broker from "../components/Broker";

import styles from "../styles/BrokersScreen.styles";

export default function BrokersScreen() {
  const { data, loading, error } = useFetch(`/nepse/top-broker`);

  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleInputChange = (text) => {
    setSearchInput(text);
    if (text.length > 0) {
      const filteredBrokers = data?.data?.data?.filter((broker) => {
        return broker.name.toLowerCase().includes(text.toLowerCase());
      });
      setSearchResults(filteredBrokers);
    } else {
      setSearchResults([]);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="default" />
      <View style={styles.searchContainer}>
        <AppText style={styles.searchTitle}>Search Brokers</AppText>
        <AppInput
          placeholder="Symbol or Name..."
          squared
          value={searchInput}
          onChangeText={handleInputChange}
          autoCapitalize="none"
        />
      </View>

      <View style={styles.brokersContainer}>
        <AppText style={styles.brokersTitle}>Top Brokers</AppText>

        <View style={styles.brokersListContainer}>
          {loading ? (
            <Loader />
          ) : (
            <FlashList
              data={searchResults.length > 0 ? searchResults : data?.data?.data}
              renderItem={({ item }) => <Broker broker={item} />}
              keyExtractor={(item) => item.number}
              estimatedItemSize={52}
            />
          )}
        </View>
      </View>
    </View>
  );
}
