import { useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Linking,
} from "react-native";
import { width, height, totalSize } from "react-native-dimension";
import { FlashList } from "@shopify/flash-list";

import AppText from "../components/AppText";
import Loader from "../components/Loader";
import colors from "../config/colors";
import useFetch from "../hooks/useFetch";

const NewsScreen = () => {
  const [symbol, setSymbol] = useState("NEPSE");
  const [start, setStart] = useState(1);
  const [length, setLength] = useState(10);
  const [payload, setPayload] = useState("");
  const [url, setUrl] = useState(`/nepse/latest-news`);
  const {
    data: news,
    loading: newsLoading,
    error: newsError,
  } = useFetch(`${url}${payload}`);

  const handleLoadMore = () => {
    setPayload(`?payload=${news?.data?.nextPayload}`);
  };

  return (
    <View style={styles.container}>
      {newsLoading ? (
        <Loader />
      ) : (
        news?.data?.data?.length > 0 && (
          <View style={styles.newsContainer}>
            <FlashList
              data={news?.data?.data}
              renderItem={({ item }) => (
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.news}
                  onPress={() => {
                    Linking.openURL(item.url);
                  }}
                >
                  <Image
                    source={{
                      uri: item.imageUrl,
                    }}
                    style={styles.newsThumbnail}
                  />
                  <AppText variant="Medium" style={styles.newsTitle}>
                    {item.title}
                  </AppText>
                  <AppText variant="Light" style={styles.newsDate}>
                    {item.date}
                  </AppText>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item.url}
              estimatedItemSize={news?.data?.data?.length}
              // showsVerticalScrollIndicator={false}
              ListEmptyComponent={() => (
                <AppText variant="Medium" style={{ textAlign: "center" }}>
                  No News Found
                </AppText>
              )}
              ListFooterComponent={() => (
                <View style={styles.loadMoreButtonContainer}>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.loadMoreButton}
                    onPress={handleLoadMore}
                  >
                    <AppText variant="Medium" style={styles.loadMoreButtonText}>
                      Load More
                    </AppText>
                  </TouchableOpacity>
                </View>
              )}
            />
          </View>
        )
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.dark.primary,
    paddingHorizontal: width(5),
  },
  newsContainer: {
    flex: 1,
    marginTop: height(2),
    paddingBottom: height(2),
  },
  news: {
    backgroundColor: colors.dark.secondary,
    padding: width(5),
    borderRadius: 10,
    marginTop: height(2),
  },
  newsThumbnail: {
    width: "100%",
    height: height(15),
    borderRadius: 10,
    marginBottom: height(1.5),
  },
  newsTitle: {
    fontSize: totalSize(1.7),
    color: colors.dark.textColor,
  },
  newsDate: {
    fontSize: totalSize(1.5),
    color: colors.dark.textColor,
    marginTop: height(1),
  },
  loadMoreButtonContainer: {
    alignItems: "center",
    marginTop: height(2),
  },
  loadMoreButton: {
    backgroundColor: colors.dark.bottomTab,
    paddingVertical: height(1),
    paddingHorizontal: width(5),
    borderRadius: 10,
  },
});

export default NewsScreen;
