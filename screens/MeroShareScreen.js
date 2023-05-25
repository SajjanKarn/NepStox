import { ActivityIndicator } from "react-native";
import { WebView } from "react-native-webview";
import colors from "../config/colors";
import Loader from "../components/Loader";

export default function MeroShareScreen() {
  return (
    <WebView
      source={{
        uri: `https://meroshare.cdsc.com.np/#/login`,
      }}
      // add a loading indicator
      renderLoading={() => <Loader />}
      startInLoadingState={true}
      onLoadStart={() => <Loader />}
      style={{ flex: 1 }}
    />
  );
}
