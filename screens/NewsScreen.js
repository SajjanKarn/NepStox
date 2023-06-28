import { useState } from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { width, height, totalSize } from "react-native-dimension";

import colors from "../config/colors";
import AppText from "../components/AppText";
import useFetch from "../hooks/useFetch";
import Loader from "../components/Loader";
import { FlashList } from "@shopify/flash-list";

const NewsScreen = () => {
  const [symbol, setSymbol] = useState("NEPSE");
  const [start, setStart] = useState(1);
  const [length, setLength] = useState(10);
  const {
    data: news,
    loading: newsLoading,
    error: newsError,
  } = useFetch(`/nepse/news/${symbol}/${start}/${length}`);

  const handleLoadMore = () => {
    console.log("Load More");
  };

  return (
    <View style={styles.container}>
      {newsLoading ? (
        <Loader />
      ) : (
        news?.data?.data?.length > 0 && (
          <View style={styles.newsContainer}>
            {!newsLoading && (
              <FlashList
                data={news?.data?.data}
                renderItem={({ item }) => (
                  <TouchableOpacity activeOpacity={0.8} style={styles.news}>
                    <Image
                      source={{
                        uri: "https://www.setopati.com/uploads/posts/1596959778siraha.jpg",
                      }}
                      style={styles.newsThumbnail}
                    />
                    <AppText variant="Medium" style={styles.newsTitle}>
                      {item.title}
                    </AppText>
                    <AppText variant="Light" style={styles.newsDate}>
                      {item.published_date}
                    </AppText>
                  </TouchableOpacity>
                )}
                keyExtractor={(item) => item.slug}
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
                      <AppText
                        variant="Medium"
                        style={styles.loadMoreButtonText}
                      >
                        Load More
                      </AppText>
                    </TouchableOpacity>
                  </View>
                )}
              />
            )}
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
