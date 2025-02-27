import { WebView } from "react-native-webview";
import Loader from "../components/Loader";
import colors from "../config/colors";

export default function MeroShareScreen() {
  return (
    <WebView
      source={{
        uri: `https://meroshare.cdsc.com.np/#/login`,
      }}
      renderLoading={() => <Loader color={colors.dark.primary} />}
      startInLoadingState={true}
      onLoadStart={() => <Loader color={colors.dark.primary} />}
      style={{ flex: 1 }}
    />
  );
}
