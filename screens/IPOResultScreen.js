import { WebView } from "react-native-webview";
import Loader from "../components/Loader";
import colors from "../config/colors";

export default function IPOResultScreen() {
  const userAgent =
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36";

  return (
    <WebView
      userAgent={userAgent}
      source={{
        uri: `https://iporesult.cdsc.com.np/`,
      }}
      renderLoading={() => <Loader color={colors.dark.primary} />}
      startInLoadingState={true}
      onLoadStart={() => <Loader color={colors.dark.primary} />}
      style={{ flex: 1 }}
    />
  );
}
